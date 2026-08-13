package com.ian.escuela;

import android.app.admin.DeviceAdminReceiver;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

/** Receives the Device Owner enrolment completed by Android. */
public class KioskDeviceAdminReceiver extends DeviceAdminReceiver {
    private static final String TAG = "IanEscuelaKiosk";

    @Override
    public void onProfileProvisioningComplete(Context context, Intent intent) {
        DevicePolicyManager policyManager =
                (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);
        ComponentName admin = new ComponentName(context, KioskDeviceAdminReceiver.class);

        if (policyManager != null && policyManager.isDeviceOwnerApp(context.getPackageName())) {
            policyManager.setLockTaskPackages(admin, new String[]{context.getPackageName()});
        }

        Log.i(TAG, "La tablet fue registrada como dispositivo dedicado.");
    }
}
