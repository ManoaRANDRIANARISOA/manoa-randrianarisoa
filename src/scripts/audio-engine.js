// ==============================================================================
// SUBTLE TACTILE AUDIO SYNTHESIZER (WEB AUDIO API)
// ==============================================================================

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('manoa_arch_sound') === 'true';
    this.initAudioContext();
  }

  initAudioContext() {
    if (this.enabled && !this.ctx) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      } catch (e) {
        console.warn('AudioContext not supported', e);
      }
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('manoa_arch_sound', String(this.enabled));
    if (this.enabled) {
      this.initAudioContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.playBeep(520, 0.05, 0.05);
    }
    return this.enabled;
  }

  playBeep(freq = 440, duration = 0.04, gainLevel = 0.03) {
    if (!this.enabled) return;
    this.initAudioContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  playClick() {
    this.playBeep(680, 0.03, 0.03);
  }

  playNodeSelect() {
    this.playBeep(420, 0.08, 0.04);
  }

  playError() {
    this.playBeep(220, 0.12, 0.05);
  }
}

export const sound = new AudioEngine();
