package com.ian.escuela;

import android.app.Instrumentation;
import android.app.admin.DevicePolicyManager;
import android.content.Context;
import android.content.Intent;
import android.os.SystemClock;
import android.view.View;
import android.view.WindowManager;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;

import java.util.concurrent.atomic.AtomicBoolean;

import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/** Runs on an enrolled test tablet; does not change school data or kiosk policy. */
@RunWith(AndroidJUnit4.class)
public class ScreenTimeoutGuardTest {
    private static final int KEEP_SCREEN_ON = WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON;
    private final Instrumentation instrumentation = InstrumentationRegistry.getInstrumentation();

    @Test
    public void clearsRetainedFlagsAndPreservesCurrentRequests() {
        Context context = instrumentation.getTargetContext();
        DevicePolicyManager policy = (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);
        assertTrue("Run on a tablet enrolled to Ian Escuela", policy.isDeviceOwnerApp(context.getPackageName()));
        Intent intent = new Intent(context, MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        MainActivity activity = (MainActivity) instrumentation.startActivitySync(intent);
        View webView = activity.getBridge().getWebView();

        try {
            instrumentation.runOnMainSync(() -> {
                webView.setKeepScreenOn(false);
                activity.getWindow().clearFlags(KEEP_SCREEN_ON);
                retainWindowFlag(activity);
            });
            awaitWindowFlag(activity, false, "Retained window flag was not released");

            // A real video uses a view request. It must remain effective while active.
            instrumentation.runOnMainSync(() -> webView.setKeepScreenOn(true));
            instrumentation.runOnMainSync(() -> retainWindowFlag(activity));
            SystemClock.sleep(100);
            instrumentation.runOnMainSync(() -> assertTrue(hasWindowFlag(activity)));

            // Reproduce the fault: playback ends after the global flag was copied.
            instrumentation.runOnMainSync(() -> webView.setKeepScreenOn(false));
            awaitWindowFlag(activity, false, "Window stayed awake after playback released its request");

            // Explicit window requests are also distinct from a retained view flag.
            instrumentation.runOnMainSync(() -> activity.getWindow().addFlags(KEEP_SCREEN_ON));
            awaitWindowFlag(activity, true, "An explicit window request was cleared");
            instrumentation.runOnMainSync(() -> activity.getWindow().clearFlags(KEEP_SCREEN_ON));
            awaitWindowFlag(activity, false, "Explicit window request did not clear");
        } finally {
            instrumentation.runOnMainSync(() -> {
                webView.setKeepScreenOn(false);
                activity.getWindow().clearFlags(KEEP_SCREEN_ON);
            });
        }
    }

    private void retainWindowFlag(MainActivity activity) {
        View decor = activity.getWindow().getDecorView();
        assertFalse("The app itself must not request an always-on window",
                (activity.getWindow().getAttributes().flags & KEEP_SCREEN_ON) != 0);
        WindowManager.LayoutParams retained = new WindowManager.LayoutParams();
        retained.copyFrom((WindowManager.LayoutParams) decor.getLayoutParams());
        retained.flags |= KEEP_SCREEN_ON;
        activity.getWindowManager().updateViewLayout(decor, retained);
        decor.invalidate();
    }

    private boolean hasWindowFlag(MainActivity activity) {
        return (((WindowManager.LayoutParams) activity.getWindow().getDecorView().getLayoutParams()).flags
                & KEEP_SCREEN_ON) != 0;
    }

    private void awaitWindowFlag(MainActivity activity, boolean expected, String message) {
        AtomicBoolean matches = new AtomicBoolean();
        long deadline = SystemClock.uptimeMillis() + 3000;
        do {
            instrumentation.runOnMainSync(() -> matches.set(hasWindowFlag(activity) == expected));
            if (matches.get()) return;
            SystemClock.sleep(20);
        } while (SystemClock.uptimeMillis() < deadline);
        assertTrue(message, matches.get());
    }
}
