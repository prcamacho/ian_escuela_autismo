package com.ian.escuela;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/** Keeps the tablet credential out of browser storage and JavaScript. */
@CapacitorPlugin(name = "Companion")
public class CompanionPlugin extends Plugin {
    private final ExecutorService requests = Executors.newFixedThreadPool(3);

    @PluginMethod
    public void getConfig(PluginCall call) {
        JSObject result = new JSObject();
        CompanionSettings settings = CompanionSettings.read(getContext());
        result.put("enabled", settings.enabled);
        result.put("connection", settings.endpoint.startsWith("https:") ? "internet" : "usb");
        call.resolve(result);
    }

    @PluginMethod
    public void request(PluginCall call) {
        CompanionSettings settings = CompanionSettings.read(getContext());
        String route = call.getString("route", "");
        if (!settings.enabled) { call.reject("Compañero no habilitado en esta tablet."); return; }
        if (!Arrays.asList("config", "session", "heartbeat", "stop").contains(route)) {
            call.reject("Pedido no permitido."); return;
        }
        byte[] body = call.getObject("payload", new JSObject()).toString().getBytes(StandardCharsets.UTF_8);
        if (body.length > 65536) { call.reject("Pedido demasiado grande."); return; }
        requests.execute(() -> {
            HttpURLConnection connection = null;
            try {
                connection = (HttpURLConnection) new URL(settings.endpoint + "/api/companion/" + route).openConnection();
                connection.setInstanceFollowRedirects(false);
                connection.setConnectTimeout(5000);
                connection.setReadTimeout("session".equals(route) ? 35000 : 6000);
                connection.setRequestProperty("Authorization", "Bearer " + settings.token);
                connection.setRequestProperty("Accept", "application/json");
                if (!"config".equals(route)) {
                    connection.setRequestMethod("POST");
                    connection.setRequestProperty("Content-Type", "application/json");
                    connection.setDoOutput(true);
                    try (java.io.OutputStream output = connection.getOutputStream()) { output.write(body); }
                }
                int status = connection.getResponseCode();
                try (InputStream input = status >= 400 ? connection.getErrorStream() : connection.getInputStream();
                     ByteArrayOutputStream bytes = new ByteArrayOutputStream()) {
                    if (input == null) throw new IllegalStateException();
                    byte[] buffer = new byte[4096];
                    int size;
                    while ((size = input.read(buffer)) != -1) {
                        if (bytes.size() + size > 131072) throw new IllegalStateException();
                        bytes.write(buffer, 0, size);
                    }
                    JSObject result = new JSObject();
                    result.put("status", status);
                    result.put("body", new JSObject(bytes.toString(StandardCharsets.UTF_8.name())));
                    call.resolve(result);
                }
            } catch (Exception ignored) {
                call.reject(settings.endpoint.startsWith("https:")
                        ? "No pude conectar con el compañero. Revisá la conexión a Internet y probá otra vez."
                        : "No pude conectar con el compañero. Esta conexión de prueba necesita el cable USB y el servidor de la PC encendido.");
            } finally {
                if (connection != null) connection.disconnect();
            }
        });
    }

    @Override
    protected void handleOnDestroy() {
        requests.shutdownNow();
    }
}
