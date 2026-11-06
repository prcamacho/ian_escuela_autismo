package com.ian.escuela;

import android.content.Context;
import android.content.SharedPreferences;
import android.database.ContentObserver;
import android.media.AudioManager;
import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.provider.Settings;
import android.util.Log;
import android.view.KeyEvent;

/** A short, renewable lease prevents a closed or stalled WebView leaving a cap. */
final class StoryVolumeController {
    private static final long LEASE_MS = 15_000;
    private final Context context;
    private final AudioManager audio;
    private final StoryVolumePolicy policy;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final SharedPreferences recovery;
    private String token;
    private long expiresAt;
    private boolean observing;

    StoryVolumeController(Context context) {
        this.context = context;
        audio = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
        recovery = context.getSharedPreferences("story-volume-recovery", Context.MODE_PRIVATE);
        if (recovery.contains("previous") && recovery.getBoolean("restoreOnEnd", true)
                && !recovery.getBoolean("changed", true)
                && audio.getStreamVolume(AudioManager.STREAM_MUSIC) == recovery.getInt("applied", -1)) {
            audio.setStreamVolume(AudioManager.STREAM_MUSIC, recovery.getInt("previous", 0), 0);
        }
        recovery.edit().clear().apply();
        policy = new StoryVolumePolicy(new StoryVolumePolicy.Output() {
            public int current() { return audio.getStreamVolume(AudioManager.STREAM_MUSIC); }
            public int maximum() { return audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC); }
            public void set(int level) { audio.setStreamVolume(AudioManager.STREAM_MUSIC, level, 0); }
        });
    }

    void begin(String value) {
        begin(value, 70);
    }

    void begin(String value, int maxPercent) {
        begin(value, maxPercent, true);
    }

    void begin(String value, int maxPercent, boolean restoreOnEnd) {
        if (maxPercent < 1 || maxPercent > 70) throw new IllegalArgumentException("Límite inválido.");
        if (audio.isVolumeFixed()) throw new IllegalStateException("El dispositivo no permite limitar el volumen.");
        if (token != null && (!token.equals(value) || policy.maxPercent() != maxPercent
                || policy.restoreOnEnd() != restoreOnEnd)) end(null);
        token = value;
        expiresAt = SystemClock.elapsedRealtime() + LEASE_MS;
        try {
            policy.begin(maxPercent, restoreOnEnd);
            if (!observing) {
                context.getContentResolver().registerContentObserver(Settings.System.CONTENT_URI, true, observer);
                observing = true;
            }
            remember();
            handler.removeCallbacks(check);
            handler.postDelayed(check, 250);
        } catch (RuntimeException exception) {
            end(null);
            throw exception;
        }
    }

    void refresh(String value) {
        if (!value.equals(token)) throw new IllegalStateException("La locución ya terminó.");
        expiresAt = SystemClock.elapsedRealtime() + LEASE_MS;
        enforce();
    }

    void end(String value) {
        if (value != null && !value.equals(token)) return;
        token = null;
        handler.removeCallbacks(check);
        if (observing) context.getContentResolver().unregisterContentObserver(observer);
        observing = false;
        try { policy.end(); }
        catch (RuntimeException exception) { Log.w("IanStoryVolume", "No se pudo restaurar el volumen", exception); }
        recovery.edit().clear().apply();
    }

    boolean handleKey(KeyEvent event) {
        if (token == null) return false;
        int key = event.getKeyCode();
        if (key != KeyEvent.KEYCODE_VOLUME_UP && key != KeyEvent.KEYCODE_VOLUME_DOWN && key != KeyEvent.KEYCODE_VOLUME_MUTE) return false;
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            try {
                if (key == KeyEvent.KEYCODE_VOLUME_MUTE) policy.toggleMute();
                else policy.adjust(key == KeyEvent.KEYCODE_VOLUME_UP ? 1 : -1);
                remember();
            } catch (RuntimeException exception) { end(null); }
        }
        return true;
    }

    boolean active() { return token != null; }
    boolean restoreOnEnd() { return policy.restoreOnEnd(); }
    int ceiling() { return policy.ceiling(); }
    int current() { return audio.getStreamVolume(AudioManager.STREAM_MUSIC); }
    int maximum() { return audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC); }

    private void remember() {
        if (recovery.getInt("previous", -1) == policy.previous()
                && recovery.getInt("applied", -1) == policy.applied()
                && recovery.getBoolean("changed", false) == policy.changed()
                && recovery.getBoolean("restoreOnEnd", true) == policy.restoreOnEnd()) return;
        recovery.edit().putInt("previous", policy.previous()).putInt("applied", policy.applied())
                .putBoolean("changed", policy.changed()).putBoolean("restoreOnEnd", policy.restoreOnEnd()).apply();
    }

    private void enforce() {
        try { policy.observe(); remember(); }
        catch (RuntimeException exception) { end(null); }
    }

    private final ContentObserver observer = new ContentObserver(handler) {
        @Override public void onChange(boolean selfChange) { if (token != null) enforce(); }
    };

    private final Runnable check = new Runnable() {
        @Override public void run() {
            if (token == null) return;
            if (SystemClock.elapsedRealtime() >= expiresAt) { end(null); return; }
            enforce();
            if (token != null) handler.postDelayed(this, 250);
        }
    };
}
