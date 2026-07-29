package com.herguardian.app.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import com.herguardian.app.service.VoiceListenerService;
import com.herguardian.app.util.SessionManager;

/**
 * Restarts VoiceListenerService after phone reboots
 * So protection is always active
 */
public class BootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        if (!Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
            return;
        }

        SessionManager session = new SessionManager(context);

        // Only restart if user was logged in before reboot
        if (session.isLoggedIn() && session.isServiceActive()) {
            Log.d("BootReceiver",
                    "✅ Restarting VoiceListenerService after boot");

            Intent serviceIntent =
                    new Intent(context, VoiceListenerService.class);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(serviceIntent);
            } else {
                context.startService(serviceIntent);
            }
        }
    }
}