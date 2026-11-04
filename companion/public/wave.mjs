// Samples actual audio locally. It neither records nor sends audio anywhere.
export class VoiceWave {
  constructor(svg, onSpeaking = () => {}) {
    this.svg = svg; this.path = svg.querySelector("path"); this.onSpeaking = onSpeaking;
    this.sources = {}; this.analyzers = {}; this.level = 0; this.active = false;
    this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  async prepare() {
    if (!this.context) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.context = new AudioContext();
    }
    await this.context.resume();
  }
  attach(kind, stream) {
    this.sources[kind]?.disconnect();
    delete this.sources[kind]; delete this.analyzers[kind];
    if (stream && this.context) {
      const analyzer = this.context.createAnalyser(); analyzer.fftSize = 256;
      const source = this.context.createMediaStreamSource(stream); source.connect(analyzer);
      this.sources[kind] = source;
      this.analyzers[kind] = { analyzer, data: new Float32Array(analyzer.fftSize) };
    }
  }
  setActive(active) {
    this.active = active;
    cancelAnimationFrame(this.frame);
    if (active) this.draw();
    else { this.path.setAttribute("d", "M20 60 H580"); this.svg.dataset.speaker = "none"; this.onSpeaking(false); }
  }
  draw() {
    if (!this.active) return;
    const rms = kind => {
      const a = this.analyzers[kind]; if (!a) return 0;
      a.analyzer.getFloatTimeDomainData(a.data);
      return Math.sqrt(a.data.reduce((sum, value) => sum + value * value, 0) / a.data.length);
    };
    const output = rms("output"); const input = rms("input");
    const speaking = output > .008;
    this.svg.dataset.speaker = speaking ? "companion" : input > .008 ? "user" : "none";
    this.onSpeaking(speaking);
    this.level += (Math.min(1, Math.max(output, input) * 8) - this.level) * .2;
    let d = "";
    const time = performance.now() / 160;
    for (let x = 20; x <= 580; x += 4) {
      const envelope = Math.sin((x - 20) / 560 * Math.PI) ** 2;
      const amplitude = this.reducedMotion ? 0 : this.level * 38;
      const y = 60 + Math.sin(x / 15 - time) * envelope * amplitude + Math.sin(x / 32 + time) * envelope * amplitude * .35;
      d += `${x === 20 ? "M" : "L"}${x} ${y.toFixed(2)} `;
    }
    this.path.setAttribute("d", d);
    this.frame = requestAnimationFrame(() => this.draw());
  }
}
