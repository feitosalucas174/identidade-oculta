import { beforeEach, expect, it, vi } from 'vitest';

const contexts: any[] = [];
class FakeContext {
  state = 'suspended';
  currentTime = 0;
  destination = {};
  gains: any[] = [];
  compressors: any[] = [];
  oscillators: any[] = [];
  createOscillator() {
    const oscillator = { type: '', frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: vi.fn(), disconnect: vi.fn(), start: vi.fn(), stop: vi.fn() };
    this.oscillators.push(oscillator);
    return oscillator;
  }
  createMediaElementSource = vi.fn(() => ({ connect: vi.fn() }));
  resume = vi.fn(async () => { this.state = 'running'; });
  constructor() { contexts.push(this); }
  createGain() {
    const node = { gain: { value: 1, setValueAtTime: vi.fn(), cancelScheduledValues: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: vi.fn(), disconnect: vi.fn() };
    this.gains.push(node);
    return node;
  }
  createDynamicsCompressor() {
    const node = { threshold: { value: 0 }, knee: { value: 0 }, ratio: { value: 0 }, attack: { value: 0 }, release: { value: 0 }, connect: vi.fn() };
    this.compressors.push(node);
    return node;
  }
}

beforeEach(() => {
  vi.resetModules();
  contexts.length = 0;
  vi.stubGlobal('window', { AudioContext: FakeContext });
});

it('boosts detective speech through a peak limiter and routes each element once', async () => {
  const { connectAudioElement, resumeAudioOutput } = await import('./audioBus');
  const audio = { volume: 0.5 } as HTMLMediaElement;
  connectAudioElement(audio, 'voices', 1.25);
  connectAudioElement(audio, 'voices', 1.25);
  const context = contexts[0];
  expect(context.createMediaElementSource).toHaveBeenCalledTimes(1);
  expect(context.gains[0].gain.value).toBe(1.25);
  expect(context.compressors[0].threshold.value).toBe(-3);
  expect(audio.volume).toBe(1);
  await resumeAudioOutput();
  expect(context.resume).toHaveBeenCalledOnce();
});

it('applies reduced music volume, restores it, and clamps invalid levels', async () => {
  const { connectAudioElement, setAudioChannelVolume } = await import('./audioBus');
  connectAudioElement({ volume: 1 } as HTMLMediaElement, 'music');
  const gain = contexts[0].gains[1].gain;
  setAudioChannelVolume('music', 0.24 * 0.4);
  expect(gain.setValueAtTime).toHaveBeenLastCalledWith(0.096, 0);
  setAudioChannelVolume('music', 0.24);
  expect(gain.setValueAtTime).toHaveBeenLastCalledWith(0.24, 0);
  setAudioChannelVolume('music', -1);
  expect(gain.setValueAtTime).toHaveBeenLastCalledWith(0, 0);
});

it('routes the cassette click through the muted effects channel and stops both pulses', async () => {
  const { playSequenceInsertSound, setAudioChannelVolume } = await import('./audioBus');
  setAudioChannelVolume('effects', 0);
  playSequenceInsertSound();
  const context = contexts[0];
  expect(context.gains[0].gain.setValueAtTime).toHaveBeenCalledWith(0, 0);
  expect(context.oscillators).toHaveLength(2);
  expect(context.oscillators[0].stop).toHaveBeenCalledWith(0.08);
  expect(context.oscillators[1].stop).toHaveBeenCalledWith(0.155);
  expect(context.gains[1].connect).toHaveBeenCalledWith(context.gains[0]);
  context.oscillators[0].onended();
  expect(context.gains[1].disconnect).toHaveBeenCalledOnce();
});
