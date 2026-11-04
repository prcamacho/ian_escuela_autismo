package com.ian.escuela;

import android.content.Context;
import java.io.File;
import java.io.FileInputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;
import java.net.URI;

/** Provisioned only by the trusted USB computer; excluded from Android backups. */
final class CompanionSettings {
    final boolean enabled;
    final String endpoint;
    final String token;

    private CompanionSettings(boolean enabled, String endpoint, String token) {
        this.enabled = enabled;
        this.endpoint = endpoint;
        this.token = token;
    }

    static CompanionSettings read(Context context) {
        try {
            File file = new File(context.getNoBackupFilesDir(), "companion.json");
            if (file.length() > 4096) throw new IllegalArgumentException();
            try (FileInputStream input = new FileInputStream(file);
                 ByteArrayOutputStream bytes = new ByteArrayOutputStream()) {
                byte[] buffer = new byte[1024];
                int size;
                while ((size = input.read(buffer)) != -1) bytes.write(buffer, 0, size);
                JSONObject config = new JSONObject(bytes.toString(StandardCharsets.UTF_8.name()));
                String endpoint = config.optString("endpoint");
                String token = config.optString("token");
                URI uri = new URI(endpoint);
                boolean secureServer = "https".equals(uri.getScheme()) && uri.getHost() != null
                        && uri.getUserInfo() == null && uri.getQuery() == null && uri.getFragment() == null
                        && (uri.getPath() == null || uri.getPath().isEmpty());
                boolean valid = (secureServer || "http://127.0.0.1:4180".equals(endpoint))
                        && token.matches("[a-f0-9]{64}") && config.optBoolean("enabled", false);
                return new CompanionSettings(valid, endpoint, token);
            }
        } catch (Exception ignored) {
            return new CompanionSettings(false, "", "");
        }
    }
}
