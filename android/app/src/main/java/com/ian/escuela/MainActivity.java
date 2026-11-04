package com.ian.escuela;

import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.view.KeyEvent;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;

import com.getcapacitor.BridgeActivity;

/**
 * Hosts the Capacitor app and enters Android's dedicated-device mode whenever
 * this package has been enrolled as the tablet's Device Owner.
 */
public class MainActivity extends BridgeActivity {
    private static final String TAG = "IanEscuelaKiosk";
    private static final String SCREEN_OFF_TIMEOUT_MS = "180000";
    private static final String SCREEN_BRIGHTNESS = "178";

    private DevicePolicyManager devicePolicyManager;
    private ComponentName adminReceiver;
    private StoryVolumeController storyVolumeController;
    private final ViewTreeObserver.OnPreDrawListener screenTimeoutGuard = () -> {
        releaseStaleScreenOnFlag();
        return true;
    };

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(CompanionPlugin.class);
        registerPlugin(StoryVolumePlugin.class);
        storyVolumeController = new StoryVolumeController(this);
        super.onCreate(savedInstanceState);

        getBridge().getWebView().getSettings().setSupportZoom(false);

        devicePolicyManager = (DevicePolicyManager) getSystemService(Context.DEVICE_POLICY_SERVICE);
        adminReceiver = new ComponentName(this, KioskDeviceAdminReceiver.class);
        configureDedicatedDevice();
        getWindow().getDecorView().getViewTreeObserver().addOnPreDrawListener(screenTimeoutGuard);
    }

    StoryVolumeController storyVolume() { return storyVolumeController; }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        if (storyVolumeController != null && storyVolumeController.handleKey(event)) return true;
        return super.dispatchKeyEvent(event);
    }

    @Override
    public void onResume() {
        super.onResume();
        enterKioskMode();
        hideSystemBars();
        releaseStaleScreenOnFlag();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideSystemBars();
            releaseStaleScreenOnFlag();
        }
    }

    @Override
    public void onDestroy() {
        ViewTreeObserver observer = getWindow().getDecorView().getViewTreeObserver();
        if (observer.isAlive()) observer.removeOnPreDrawListener(screenTimeoutGuard);
        super.onDestroy();
    }

    private void releaseStaleScreenOnFlag() {
        View decor = getWindow().getDecorView();
        ViewGroup.LayoutParams layout = decor.getLayoutParams();
        if (!(layout instanceof WindowManager.LayoutParams)) return;
        int keepScreenOn = WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON;
        if ((((WindowManager.LayoutParams) layout).flags & keepScreenOn) == 0
                || (getWindow().getAttributes().flags & keepScreenOn) != 0
                || hasVisibleScreenOnRequest(decor)
                || !isDeviceOwner() || isKioskPaused()) return;

        // Android can copy a temporary WebView request into the decor's window
        // flags and retain it after playback ends. Re-send the app's clean
        // attributes only when no visible view or explicit window request needs it.
        getWindow().clearFlags(keepScreenOn);
    }

    private static boolean hasVisibleScreenOnRequest(View view) {
        if (view.getVisibility() != View.VISIBLE) return false;
        if (view.getKeepScreenOn()) return true;
        if (view instanceof ViewGroup) {
            ViewGroup group = (ViewGroup) view;
            for (int index = 0; index < group.getChildCount(); index++) {
                if (hasVisibleScreenOnRequest(group.getChildAt(index))) return true;
            }
        }
        return false;
    }

    private boolean isDeviceOwner() {
        return devicePolicyManager != null
                && devicePolicyManager.isDeviceOwnerApp(getPackageName());
    }

    private boolean isKioskPaused() {
        return getSharedPreferences(KioskRecoveryActivity.PREFERENCES_NAME, MODE_PRIVATE)
                .getBoolean(KioskRecoveryActivity.KIOSK_PAUSED_KEY, false);
    }

    private void configureDedicatedDevice() {
        if (!isDeviceOwner() || isKioskPaused()) {
            return;
        }

        devicePolicyManager.setLockTaskPackages(
                adminReceiver,
                new String[]{getPackageName(), KioskRecoveryActivity.class.getName()}
        );
        // Three minutes gives Ian time to use the app without leaving the
        // display on indefinitely when the tablet is unattended.
        devicePolicyManager.setSystemSetting(
                adminReceiver,
                Settings.System.SCREEN_OFF_TIMEOUT,
                SCREEN_OFF_TIMEOUT_MS
        );
        devicePolicyManager.setSystemSetting(
                adminReceiver,
                Settings.System.SCREEN_BRIGHTNESS_MODE,
                Integer.toString(Settings.System.SCREEN_BRIGHTNESS_MODE_MANUAL)
        );
        devicePolicyManager.setSystemSetting(
                adminReceiver,
                Settings.System.SCREEN_BRIGHTNESS,
                SCREEN_BRIGHTNESS
        );
        IntentFilter homeIntentFilter = new IntentFilter(Intent.ACTION_MAIN);
        homeIntentFilter.addCategory(Intent.CATEGORY_HOME);
        homeIntentFilter.addCategory(Intent.CATEGORY_DEFAULT);
        devicePolicyManager.addPersistentPreferredActivity(
                adminReceiver,
                homeIntentFilter,
                new ComponentName(this, MainActivity.class)
        );
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            // Do not expose the system UI while Ian is using the dedicated app.
            devicePolicyManager.setLockTaskFeatures(
                    adminReceiver,
                    DevicePolicyManager.LOCK_TASK_FEATURE_NONE
            );
        }
    }

    private void enterKioskMode() {
        if (!isDeviceOwner() || isKioskPaused()) {
            return;
        }

        configureDedicatedDevice();
        try {
            startLockTask();
        } catch (IllegalStateException | SecurityException exception) {
            // The app stays usable if a manufacturer rejects a kiosk policy.
            Log.e(TAG, "No se pudo activar el modo kiosco", exception);
        }
    }

    /** Hides Samsung's navigation bar while the tablet is dedicated to Ian. */
    private void hideSystemBars() {
        if (!isDeviceOwner() || isKioskPaused()) {
            return;
        }

        View contentView = getWindow().getDecorView();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = contentView.getWindowInsetsController();
            if (controller != null) {
                controller.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
                controller.setSystemBarsBehavior(
                        WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                );
            }
            return;
        }

        contentView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        );
    }
}
