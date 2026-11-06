package com.ian.escuela;

/** Volume decisions kept independent of Android so restoration can be tested. */
final class StoryVolumePolicy {
    interface Output {
        int current();
        int maximum();
        void set(int level);
    }

    private final Output output;
    private boolean active;
    private boolean changed;
    private boolean restoreOnEnd = true;
    private int previous;
    private int applied;
    private int maxPercent = 70;

    StoryVolumePolicy(Output output) { this.output = output; }

    int ceiling() { return output.maximum() * maxPercent / 100; }
    int maxPercent() { return maxPercent; }
    boolean active() { return active; }
    boolean changed() { return changed; }
    boolean restoreOnEnd() { return restoreOnEnd; }
    int previous() { return previous; }
    int applied() { return applied; }

    void begin() {
        begin(70);
    }

    void begin(int percentage) {
        begin(percentage, true);
    }

    void begin(int percentage, boolean restore) {
        if (percentage < 1 || percentage > 70) throw new IllegalArgumentException("Límite inválido.");
        if (active) return;
        maxPercent = percentage;
        restoreOnEnd = restore;
        previous = output.current();
        applied = previous;
        changed = false;
        active = true;
        apply(Math.min(previous, ceiling()));
    }

    void observe() {
        if (!active) return;
        int current = output.current();
        if (current != applied) changed = true;
        apply(Math.min(current, ceiling()));
    }

    void adjust(int direction) {
        if (!active) return;
        observe();
        int target = Math.max(0, Math.min(ceiling(), applied + direction));
        if (target != applied) changed = true;
        apply(target);
    }

    void toggleMute() {
        if (!active) return;
        observe();
        changed = true;
        apply(applied > 0 ? 0 : ceiling());
    }

    void end() {
        if (!active) return;
        try { observe(); } finally { active = false; }
        // WebView can still have a short audio tail after pause(). Videos keep
        // their capped level so ending the lease cannot amplify that tail.
        if (restoreOnEnd && !changed) apply(previous);
    }

    private void apply(int value) {
        if (output.current() != value) output.set(value);
        applied = output.current();
    }
}
