export type AudioChannel = 'music' | 'voices' | 'effects';

type AudioContextWithWebkit = typeof window & {
  webkitAudioContext?: typeof AudioContext;
};

type AudioRoute = {
  source: MediaElementAudioSourceNode;
  channel: AudioChannel;
};

let sharedContext: AudioContext | null = null;
const channelNodes = new Map<AudioChannel, GainNode>();
const channelVolumes: Record<AudioChannel, number> = {
  music: 1,
  voices: 1,
  effects: 1,
};
const audioRoutes = new WeakMap<HTMLMediaElement, AudioRoute>();

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (sharedContext && sharedContext.state !== 'closed') return sharedContext;

  const AudioContextCtor =
    window.AudioContext ||
    (window as AudioContextWithWebkit).webkitAudioContext;

  if (!AudioContextCtor) return null;

  try {
    sharedContext = new AudioContextCtor();
    return sharedContext;
  } catch (error) {
    console.warn('Não foi possível inicializar o áudio Web Audio.', error);
    return null;
  }
}

function getChannelNode(context: AudioContext, channel: AudioChannel): GainNode {
  const existing = channelNodes.get(channel);
  if (existing && sharedContext === context) return existing;

  const node = context.createGain();
  node.gain.setValueAtTime(channelVolumes[channel], context.currentTime);
  node.connect(context.destination);
  channelNodes.set(channel, node);
  return node;
}

/**
 * Routes a media element through one shared Web Audio channel.
 * This is required on iOS/iPadOS because HTMLMediaElement.volume is not
 * consistently programmable there. The channel GainNode provides the
 * same volume/mute behavior on iPhone, iPad, Android, tablets and desktop.
 */
export function connectAudioElement(
  element: HTMLMediaElement,
  channel: AudioChannel,
): AudioContext | null {
  const context = getContext();
  if (!context) return null;

  const existing = audioRoutes.get(element);
  if (existing) {
    if (existing.channel !== channel) {
      // A media element is routed only once; keep its original category.
      return context;
    }
    return context;
  }

  try {
    const source = context.createMediaElementSource(element);
    source.connect(getChannelNode(context, channel));
    audioRoutes.set(element, { source, channel });
    // Once routed, leave the element at unity gain. Category gain is handled
    // by Web Audio, not HTMLMediaElement.volume.
    element.volume = 1;
    return context;
  } catch (error) {
    console.warn('Não foi possível conectar a faixa ao controle de volume.', error);
    return null;
  }
}

export function setAudioChannelVolume(channel: AudioChannel, volume: number): void {
  const safeVolume = Number.isFinite(volume)
    ? Math.min(1, Math.max(0, volume))
    : 1;

  channelVolumes[channel] = safeVolume;

  const context = sharedContext;
  const node = channelNodes.get(channel);
  if (!context || !node || context.state === 'closed') return;

  const now = context.currentTime;
  // Apply immediately while the user is dragging an iOS Safari range control.
  node.gain.cancelScheduledValues(now);
  node.gain.setValueAtTime(safeVolume, now);
}

export function resumeAudioOutput(): Promise<void> {
  const context = getContext();
  if (!context || context.state !== 'suspended') return Promise.resolve();

  return context.resume().catch((error) => {
    console.warn('O navegador não permitiu reativar o áudio.', error);
  });
}
