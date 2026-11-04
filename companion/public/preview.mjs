// Explicit UI rehearsal. No fetch, microphone, synthetic speech or provider calls.
export class PreviewSession {
  constructor(options) { Object.assign(this, options); this.state = "idle"; }
  async configure() { return { voiceConfigured: true }; }
  async start() { this.state = "live"; this.onState(this.state); }
  async stop() { this.state = "idle"; this.onState(this.state); }
  toggleMute() { this.state = this.state === "muted" ? "live" : "muted"; this.onState(this.state); }
  context() {}
  instruct() {}
}
