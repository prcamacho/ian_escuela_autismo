package com.ian.escuela;

import android.app.Activity;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

/**
 * A recovery control intended for a trusted computer through ADB. It has no
 * launcher entry, so Ian cannot reach it from the application interface.
 */
public class KioskRecoveryActivity extends Activity {
    public static final String ACTION_PAUSE_KIOSK = "com.ian.escuela.action.PAUSE_KIOSK";
    public static final String ACTION_RESUME_KIOSK = "com.ian.escuela.action.RESUME_KIOSK";
    public static final String PREFERENCES_NAME = "kiosk_controls";
    public static final String KIOSK_PAUSED_KEY = "paused";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        DevicePolicyManager policyManager =
                (DevicePolicyManager) getSystemService(Context.DEVICE_POLICY_SERVICE);
        if (policyManager == null || !policyManager.isDeviceOwnerApp(getPackageName())) {
            finish();
            return;
        }

        String action = getIntent().getAction();
        if (ACTION_PAUSE_KIOSK.equals(action)) {
            getSharedPreferences(PREFERENCES_NAME, MODE_PRIVATE)
                    .edit()
                    .putBoolean(KIOSK_PAUSED_KEY, true)
                    .apply();
            // Removing the package ends all of its locked tasks, including the
            // HOME task on manufacturers that ignore stopLockTask from here.
            policyManager.setLockTaskPackages(
                    new ComponentName(this, KioskDeviceAdminReceiver.class), new String[]{}
            );
            try { stopLockTask(); } catch (IllegalStateException | SecurityException ignored) { }
            finishAndRemoveTask();
            return;
        }

        if (ACTION_RESUME_KIOSK.equals(action)) {
            getSharedPreferences(PREFERENCES_NAME, MODE_PRIVATE)
                    .edit()
                    .putBoolean(KIOSK_PAUSED_KEY, false)
                    .apply();

            // Start Lock Task while this trusted, allowlisted activity is in
            // the foreground. This is more reliable than waiting for
            // MainActivity's lifecycle after a maintenance pause or reboot.
            policyManager.setLockTaskPackages(
                    new ComponentName(this, KioskDeviceAdminReceiver.class),
                    new String[]{getPackageName(), KioskRecoveryActivity.class.getName()}
            );
            try {
                startLockTask();
            } catch (IllegalStateException | SecurityException ignored) {
                // MainActivity attempts the same policy when it comes forward.
            }

            Intent launchIntent = getPackageManager().getLaunchIntentForPackage(getPackageName());
            if (launchIntent != null) {
                launchIntent.addFlags(
                        Intent.FLAG_ACTIVITY_CLEAR_TOP
                                | Intent.FLAG_ACTIVITY_NEW_TASK
                                | Intent.FLAG_ACTIVITY_SINGLE_TOP
                );
                startActivity(launchIntent);
            }
        }

        finish();
    }
}
