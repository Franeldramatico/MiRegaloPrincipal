// Web Audio API Synthesizer for procedural music and ambient sounds
class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private volumeNode: GainNode | null = null;

  // Sound sources
  private trainOsc: OscillatorNode | null = null;
  private trainGain: GainNode | null = null;
  private rainNoise: AudioWorkletNode | ScriptProcessorNode | null = null;
  private rainGain: GainNode | null = null;

  // Music state
  private musicInterval: any = null;
  private currentMood: string = "default";
  private isMuted: boolean = false;
  private masterVolume: number = 0.5;

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);

      // Start default ambient sounds
      this.setupTrainTracks();
      this.setupRainCrackle();
      this.startMusicScheduler();
    } catch (e) {
      console.warn("Web Audio API not supported on this browser:", e);
    }
  }

  setVolume(vol: number) {
    this.masterVolume = vol;
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.1);
    }
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(mute ? 0 : this.masterVolume, this.ctx.currentTime);
    }
  }

  private setupTrainTracks() {
    if (!this.ctx || !this.volumeNode) return;

    // Create a low frequency rumble for rails
    const rumbler = this.ctx.createOscillator();
    const rumbleGain = this.ctx.createGain();
    
    rumbler.type = "sine";
    rumbler.frequency.setValueAtTime(55, this.ctx.currentTime); // low G rumble

    rumbleGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    
    // Create rhythmic train clicking (every 1.5 seconds)
    const clickInterval = setInterval(() => {
      if (this.isMuted || !this.ctx || this.ctx.state === "suspended") return;
      this.playClick();
    }, 1200);

    rumbler.connect(rumbleGain);
    rumbleGain.connect(this.volumeNode);
    rumbler.start();

    this.trainOsc = rumbler;
    this.trainGain = rumbleGain;
  }

  private playClick() {
    if (!this.ctx || !this.volumeNode) return;
    const now = this.ctx.currentTime;
    
    // High-pass filtered pulse for track joint
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(300, now);
    bandpass.Q.setValueAtTime(2, now);

    const click1 = this.ctx.createOscillator();
    const cGain = this.ctx.createGain();
    
    click1.type = "triangle";
    click1.frequency.setValueAtTime(80, now);
    click1.frequency.exponentialRampToValueAtTime(10, now + 0.08);

    cGain.gain.setValueAtTime(0.08, now);
    cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    click1.connect(bandpass);
    bandpass.connect(cGain);
    cGain.connect(this.volumeNode);

    click1.start();
    click1.stop(now + 0.1);

    // Double-click echo (typical of train joints)
    setTimeout(() => {
      if (!this.ctx || !this.volumeNode) return;
      const echoNow = this.ctx.currentTime;
      const click2 = this.ctx.createOscillator();
      const c2Gain = this.ctx.createGain();
      
      click2.type = "triangle";
      click2.frequency.setValueAtTime(75, echoNow);
      click2.frequency.exponentialRampToValueAtTime(10, echoNow + 0.07);

      c2Gain.gain.setValueAtTime(0.05, echoNow);
      c2Gain.gain.exponentialRampToValueAtTime(0.001, echoNow + 0.07);

      click2.connect(c2Gain);
      c2Gain.connect(this.volumeNode);
      click2.start();
      click2.stop(echoNow + 0.08);
    }, 180);
  }

  private setupRainCrackle() {
    if (!this.ctx || !this.volumeNode) return;

    // Procedural rain using script processor to generate soft static/brownian noise
    try {
      const bufferSize = 4096;
      const noiseNode = this.ctx.createScriptProcessor(bufferSize, 1, 1);
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const rGain = this.ctx.createGain();
      rGain.gain.setValueAtTime(0.0, this.ctx.currentTime); // start silent

      let lastOut = 0.0;
      noiseNode.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Brownian low-pass filter
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5; // Gain factor
        }
      };

      noiseNode.connect(filter);
      filter.connect(rGain);
      rGain.connect(this.volumeNode);

      this.rainNoise = noiseNode;
      this.rainGain = rGain;
    } catch (e) {
      console.warn("Failed to create script processor rain:", e);
    }
  }

  setWeatherSound(weather: string) {
    if (!this.ctx || !this.rainGain) return;
    const now = this.ctx.currentTime;
    if (weather === "Lluvia" || weather === "Tormenta") {
      this.rainGain.gain.linearRampToValueAtTime(0.12, now + 2);
    } else if (weather === "Niebla") {
      this.rainGain.gain.linearRampToValueAtTime(0.02, now + 2); // Soft fog hiss
    } else {
      this.rainGain.gain.linearRampToValueAtTime(0.0, now + 1.5);
    }
  }

  playChime() {
    if (!this.ctx || !this.volumeNode) return;
    const now = this.ctx.currentTime;

    // Traditional railway announcer bell sound (arpeggio of 3 nice sine notes)
    const notes = [523.25, 659.25, 783.99]; // C5 - E5 - G5
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.15);
      
      gain.gain.setValueAtTime(0, now + idx * 0.15);
      gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 1.2);

      osc.connect(gain);
      gain.connect(this.volumeNode!);
      osc.start(now + idx * 0.15);
      osc.stop(now + idx * 0.15 + 1.5);
    });
  }

  // --- PROCEDURAL GENERATIVE BACKGROUND TRACK PIANO ---
  // Plays gentle chord arpeggios that shift based on emotional mood
  setMusicMood(mood: string) {
    this.currentMood = mood;
  }

  private startMusicScheduler() {
    if (this.musicInterval) clearInterval(this.musicInterval);

    // Warm chord loops
    const moods: Record<string, number[][]> = {
      default: [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4 - E4 - G4 - B4)
        [293.66, 349.23, 440.00, 523.25], // Dmin7 (D4 - F4 - A4 - C5)
        [329.63, 392.00, 493.88, 587.33], // Emin7
        [349.23, 440.00, 523.25, 659.25], // Fmaj7
      ],
      emotional: [
        [220.00, 261.63, 329.63, 392.00], // Amin7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 392.00], // G7
        [220.00, 261.63, 311.13, 392.00], // Ab diminished chill
      ],
      jazz: [
        [233.08, 293.66, 349.23, 440.00], // Bbmaj7
        [220.00, 261.63, 329.63, 392.00], // Amin7
        [196.00, 233.08, 293.66, 349.23], // Gmin7
        [174.61, 220.00, 261.63, 311.13], // F7
      ],
      ending: [
        [261.63, 329.63, 392.00, 523.25], // C Major triadic
        [349.23, 440.00, 523.25, 698.46], // F Major
        [220.00, 261.63, 329.63, 440.00], // A minor
        [261.63, 329.63, 392.00, 493.88], // Perfect Cmaj7 resolve
      ],
    };

    let step = 0;
    let chordIdx = 0;

    this.musicInterval = setInterval(() => {
      if (this.isMuted || !this.ctx || this.ctx.state === "suspended") return;

      const activeChords = moods[this.currentMood] || moods["default"];
      const currentChord = activeChords[chordIdx];

      // Play notes of the chord in a gentle arpeggiated piano-like soft envelope
      const now = this.ctx.currentTime;
      // Arpeggiate: we select which note to play on this 1/8 note step
      const noteFreq = currentChord[step % currentChord.length];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(noteFreq, now);

      // Low pass to sound like a dusty warm piano / rhodes
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, now);

      // Piano decay envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.volumeNode!);

      osc.start(now);
      osc.stop(now + 2.0);

      // Advance steps
      step++;
      if (step % 4 === 0) {
        // Change chord every 4 steps
        chordIdx = (chordIdx + 1) % activeChords.length;
      }
    }, 1400); // speed of arpeggio
  }

  // Soft note trigger for key moments/transitions
  playSingleMelodyNote(factor = 1) {
    if (!this.ctx || !this.volumeNode || this.isMuted) return;
    const now = this.ctx.currentTime;
    const list = [261.63, 329.63, 392.00, 523.25, 587.33, 659.25, 783.99]; // pentatonic warm set
    const f = list[Math.floor(Math.random() * list.length)] * factor;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(f, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.volumeNode);

    osc.start(now);
    osc.stop(now + 2.8);
  }
}

export const musicEngine = new AudioSynthesizer();
