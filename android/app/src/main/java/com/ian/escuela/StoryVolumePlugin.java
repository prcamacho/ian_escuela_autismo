package com.ian.escuela;

import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebView;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.WebViewListener;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "StoryVolume")
public class StoryVolumePlugin extends Plugin {
    private final WebViewListener pageListener = new WebViewListener() {
        @Override public void onPageStarted(WebView view) { controller().end(null); }
        @Override public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
            controller().end(null);
            return false;
        }
    };

    private StoryVolumeController controller() { return ((MainActivity) getActivity()).storyVolume(); }

    @Override public void load() { bridge.addWebViewListener(pageListener); }

    @PluginMethod public void begin(PluginCall call) { execute(call, "begin"); }
    @PluginMethod public void refresh(PluginCall call) { execute(call, "refresh"); }
    @PluginMethod public void end(PluginCall call) { execute(call, "end"); }
    @PluginMethod public void status(PluginCall call) { execute(call, "status"); }

    private void execute(PluginCall call, String method) {
        String token = call.getString("token", "");
        if (!method.equals("status") && (token.isEmpty() || token.length() > 100)) {
            call.reject("Locución inválida.");
            return;
        }
        getActivity().runOnUiThread(() -> {
            try {
                StoryVolumeController volume = controller();
                if (method.equals("begin")) volume.begin(token, call.getInt("maxPercent", 70));
                if (method.equals("refresh")) volume.refresh(token);
                if (method.equals("end")) volume.end(token);
                JSObject result = new JSObject();
                result.put("active", volume.active());
                result.put("ceiling", volume.ceiling());
                result.put("current", volume.current());
                result.put("maximum", volume.maximum());
                call.resolve(result);
            } catch (RuntimeException exception) { call.reject("No pude aplicar el límite de volumen."); }
        });
    }

    @Override protected void handleOnDestroy() {
        controller().end(null);
        bridge.removeWebViewListener(pageListener);
    }

    @Override protected void handleOnPause() {
        // Al apagar la pantalla o pasar la app a segundo plano, el video se
        // detiene incluso si WebView demora el evento visibilitychange.
        bridge.getWebView().evaluateJavascript("if (typeof stopStoryFilm === 'function') stopStoryFilm();", null);
    }
}
