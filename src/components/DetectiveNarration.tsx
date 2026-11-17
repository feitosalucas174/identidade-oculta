import { useEffect, useRef, useState } from 'react';
import { connectAudioElement, resumeAudioOutput } from '../audio/audioBus';
import { useAudioSettings } from '../contexts/AudioSettingsContext';

/** Mounted only while the detective's current card is visible. */
export function DetectiveNarration({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const { settings, setNarrationActive } = useAudioSettings();
  const voiceVolume = useRef(settings.voices);
  voiceVolume.current = settings.voices;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let disposed = false;
    setNarrationActive(true);
    const context = connectAudioElement(audio, 'voices', 1.25);
    if (!context) audio.volume = voiceVolume.current / 100;
    void resumeAudioOutput();
    void audio.play().catch(() => {
      if (!disposed) setPlaying(false);
    });
    return () => {
      disposed = true;
      audio.pause();
      audio.currentTime = 0;
      setNarrationActive(false);
    };
  }, [src, setNarrationActive]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    if (audio.ended) audio.currentTime = 0;
    setFailed(false);
    void resumeAudioOutput();
    void audio.play().catch(() => setFailed(true));
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <audio ref={audioRef} src={src} preload="auto"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)} onError={() => setFailed(true)} />
      <button type="button" onClick={toggle}
        className="min-h-[44px] px-4 rounded-lg border border-[#383e4e] text-[#F2EAE0] font-mono-retro text-[12px] hover:bg-[#2c313f]">
        {playing ? 'Pausar voz do detetive' : 'Ouvir voz do detetive'}
      </button>
      {failed && <p role="status" className="text-sm text-[#d9c49c]">Não foi possível tocar a fala. Toque para tentar novamente.</p>}
    </div>
  );
}
