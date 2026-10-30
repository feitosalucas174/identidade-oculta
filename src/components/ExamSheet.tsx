import React, { useEffect, useRef, useState } from 'react';
import { Evidence } from '../types';
import { formatTime, PHOTOS, SVGS } from '../data/evidence';
import { Mic, Volume2, Pause, RotateCcw, Disc } from 'lucide-react';

interface ExamSheetProps {
  evidence: Evidence | null;
  sequence: string[];
  isOpen: boolean;
  onClose: () => void;
  onAddToSeq: (evId: string) => void;
  onMoveSeq: (evId: string, dir: number) => void;
  onRemoveFromSeq: (evId: string) => void;
  onOpenRetroSheet?: () => void;
}

export const ExamSheet: React.FC<ExamSheetProps> = ({
  evidence,
  sequence,
  isOpen,
  onClose,
  onAddToSeq,
  onMoveSeq,
  onRemoveFromSeq,
  onOpenRetroSheet,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const duration = evidence ? Math.max(4, Math.round(evidence.desc.length / 15)) : 0;

  // Stop audio whenever evidence changes or sheet closes
  const stopAudio = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setElapsed(0);
  };

  useEffect(() => {
    stopAudio();
    return () => {
      stopAudio();
    };
  }, [evidence?.id, isOpen]);

  const toggleAudio = () => {
    if (!evidence) return;
    if (isPlaying) {
      stopAudio();
      return;
    }

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(evidence.desc);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.88;
    utterance.pitch = 0.92;

    utterance.onstart = () => {
      setIsPlaying(true);
      startTimeRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        const diff = (Date.now() - startTimeRef.current) / 1000;
        if (diff >= duration) {
          setElapsed(duration);
        } else {
          setElapsed(diff);
        }
      }, 100);
    };

    utterance.onend = () => {
      stopAudio();
      setElapsed(duration);
    };

    utterance.onerror = () => {
      stopAudio();
    };

    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen || !evidence) return null;

  const photo = PHOTOS[evidence.id];
  const svgRaw = SVGS[evidence.id];
  const seqIdx = sequence.indexOf(evidence.id);
  const inSeq = seqIdx !== -1;
  const progressRatio = duration > 0 ? Math.min(elapsed / duration, 1) : 0;

  return (
    <>
      {/* Backdrop */}
      <div
        id="backdrop"
        onClick={() => {
          stopAudio();
          onClose();
        }}
        className="fixed inset-0 z-[200] bg-black/70 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        id="sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Exame de evidência"
        className="fixed bottom-0 left-0 right-0 z-[300] bg-[#222222] rounded-t-[20px] max-h-[92vh] overflow-y-auto sm:left-1/2 sm:-translate-x-1/2 sm:max-w-[620px] sm:shadow-[0_-8px_40px_rgba(0,0,0,0.7)] pb-[calc(var(--nav-h)+16px)] transition-transform duration-300 animate-fadeup"
      >
        {/* Top bar */}
        <div className="sticky top-0 z-[2] bg-[#222222] flex items-center justify-between p-[14px_20px_12px] border-b border-[#303030]">
          <div className="w-[36px] h-[4px] rounded-[2px] bg-[#303030] absolute top-[10px] left-1/2 -translate-x-1/2" aria-hidden="true" />
          <div className="text-center flex-1">
            <div className="font-mono-retro text-[12px] tracking-[0.14em] text-[#9A9590] uppercase">
              EVIDÊNCIA {evidence.id}
            </div>
            <div className="font-brunson text-[26px] uppercase tracking-[0.04em] leading-none text-[#F2EAE0]">
              {evidence.tipo}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              stopAudio();
              onClose();
            }}
            aria-label="Fechar"
            className="w-[40px] h-[40px] rounded-full bg-[#2C2626] border border-[#303030] text-[#F2EAE0] text-[22px] cursor-pointer flex items-center justify-center hover:bg-[#3A1010] transition-colors flex-shrink-0 leading-none"
          >
            ×
          </button>
        </div>

        {/* Photo Container */}
        <div className="relative overflow-hidden bg-[#0D0D0D] border-b border-[#222222]">
          {photo ? (
            <img
              src={photo}
              alt={evidence.tipo}
              className="block w-full h-auto max-h-[360px] object-contain mx-auto"
            />
          ) : svgRaw ? (
            <div
              dangerouslySetInnerHTML={{
                __html: svgRaw
                  .replace(/id="g(\w+)"/g, `id="g$1-${evidence.id}-exam"`)
                  .replace(/url\(#g(\w+)\)/g, `url(#g$1-${evidence.id}-exam)`),
              }}
              className="block w-full h-auto"
            />
          ) : (
            <div className="h-[180px] flex items-center justify-center font-mono-retro text-[13px] text-[#303030]">
              [ FOTO ]
            </div>
          )}

          <div className="absolute top-[10px] left-[10px] z-[2] font-mono-retro text-[11px] text-[#F2EAE0] bg-[#0D0D0D]/85 px-[10px] py-[4px] rounded-[4px] flex items-center gap-[6px] tracking-[0.05em]">
            <span className="rec-dot !w-[7px] !h-[7px]" aria-hidden="true" />
            REC · {evidence.id}
          </div>
        </div>

        {/* Body */}
        <div className="p-[14px_14px] sm:p-[18px_20px] flex flex-col gap-[12px] sm:gap-[14px]">
          {/* Police Dictaphone Audio Control Panel */}
          <div className="bg-[#16171b] border-2 border-[#2d3038] rounded-[14px] p-3.5 sm:p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.6)] relative overflow-hidden">
            
            {/* Top Dictaphone Branding & Status Indicator */}
            <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-[#282b33]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#444] flex items-center justify-center">
                  <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isPlaying ? 'bg-[#ff3b30] shadow-[0_0_8px_#ff3b30] animate-pulse' : 'bg-[#402020]'
                  }`} />
                </div>
                <span className="font-mono-retro text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#9A9590] font-semibold flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-[#d94040]" />
                  Gravador Policial · {evidence.id}
                </span>
              </div>

              {/* Counter & Cassette Reel */}
              <div className="flex items-center gap-2 bg-[#0d0e11] px-2.5 py-1 rounded-[5px] border border-[#22252c]">
                <span className="font-mono-retro text-[11px] tracking-[0.08em] text-[#7DD5D8] font-bold">
                  {formatTime(elapsed)} / {formatTime(duration)}
                </span>
                <div className={`reel ${isPlaying ? 'reel-spin' : ''}`} aria-hidden="true">
                  <Disc className={`w-4 h-4 text-[#8a8f9d] ${isPlaying ? 'text-[#7DD5D8]' : ''}`} />
                </div>
              </div>
            </div>

            {/* Tape Deck Window & Animated Waveform */}
            <div className="bg-[#0b0c0e] border border-[#22252e] rounded-[8px] p-2.5 mb-3 flex items-center gap-3">
              {/* Dual Cassette Reel Display */}
              <div className="hidden sm:flex items-center justify-between w-[60px] h-[30px] bg-[#14161b] border border-[#2a2d36] rounded-[4px] px-1.5 flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-[2px] bg-[#4a2a18]" />
                <Disc className={`w-4 h-4 text-[#6a7080] z-10 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '2s' }} />
                <Disc className={`w-4 h-4 text-[#6a7080] z-10 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '2s' }} />
              </div>

              {/* Audio Waveform / Level Meter */}
              <div className="flex-1 flex flex-col gap-1">
                <div className={`flex items-end gap-[2px] h-[26px] w-full ${isPlaying ? 'audio-playing' : ''}`} aria-hidden="true">
                  {Array.from({ length: 28 }, (_, j) => {
                    const barCut = Math.round(progressRatio * 28);
                    const isBarPlayed = j < barCut;
                    const delay = (j * 0.03 + (j % 3) * 0.04).toFixed(3);
                    return (
                      <div
                        key={j}
                        className={`wave-bar ${isBarPlayed ? 'played' : 'rem'}`}
                        style={{ '--d': `${delay}s` } as React.CSSProperties}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tactile Police Recorder Control Keys */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button
                type="button"
                onClick={toggleAudio}
                aria-label={isPlaying ? "Pausar gravação policial" : "Ouvir gravação de depoimento policial"}
                className={`flex-1 min-h-[44px] px-4 rounded-[8px] font-mono-retro text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.08em] cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-150 select-none border-t border-l ${
                  isPlaying
                    ? 'bg-[#d94040] text-white border-t-[#ff6666] border-l-[#ff6666] border-r-[#802020] border-b-[#802020] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] translate-y-[1px]'
                    : 'bg-gradient-to-b from-[#343842] via-[#282c35] to-[#1c2028] text-[#F2EAE0] border-t-[#4a505e] border-l-[#4a505e] border-r-[#121419] border-b-[#121419] hover:from-[#3d424e] hover:to-[#222630] active:translate-y-[1px] shadow-[0_3px_6px_rgba(0,0,0,0.4)]'
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8]`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current text-white flex-shrink-0" />
                    <span>Pausar Depoimento</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#7DD5D8] flex-shrink-0" />
                    <span>Ouvir Gravação</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  stopAudio();
                  toggleAudio();
                }}
                title="Reiniciar depoimento do início"
                aria-label="Reiniciar depoimento do início"
                className="h-[44px] px-3.5 rounded-[8px] bg-gradient-to-b from-[#2a2d36] to-[#1a1c22] border-t border-l border-t-[#3e4250] border-l-[#3e4250] border-r-[#101115] border-b-[#101115] text-[#9A9590] hover:text-[#F2EAE0] hover:from-[#323642] active:translate-y-[1px] flex items-center justify-center gap-1.5 font-mono-retro text-[11px] uppercase tracking-[0.05em] cursor-pointer transition-all flex-shrink-0 shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Typewriter Description on parchment */}
          <div className="bg-[#E8DFC8] rounded-[10px] p-[16px_18px] font-mono-retro text-[15px] text-[#1A1008] leading-[1.75] italic shadow-inner">
            {evidence.desc}
          </div>

          {/* RetroSheet-95 Easter Egg */}
          {evidence.id === 'E-15' && onOpenRetroSheet && (
            <button
              type="button"
              onClick={onOpenRetroSheet}
              className="bg-[#008080] text-white border-2 border-t-white border-l-white border-r-black border-b-black p-3 font-mono-retro text-[13px] flex items-center justify-center gap-2 hover:bg-[#006666] active:border-t-black active:border-l-black active:border-r-white active:border-b-white transition-all shadow-md"
            >
              <span>📊</span>
              <span>Abrir no RetroSheet 95 (Planilha original de despesas)</span>
            </button>
          )}

          {/* Timeline Controls */}
          <div className="bg-[#2C2626] border border-[#303030] rounded-[10px] p-[12px_16px] flex items-center gap-3 flex-wrap min-h-[54px]">
            {!inSeq ? (
              <>
                <span className="font-mono-retro text-[12px] tracking-[0.1em] uppercase text-[#9A9590] flex-shrink-0">
                  Linha do tempo
                </span>
                <button
                  type="button"
                  onClick={() => onAddToSeq(evidence.id)}
                  className="flex-1 min-w-[130px] h-[40px] px-3 rounded-[8px] bg-[#D94040] text-white border-none font-inherit text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.07em] cursor-pointer hover:bg-[#c03434] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] whitespace-nowrap flex items-center justify-center"
                >
                  + Adicionar à sequência
                </button>
              </>
            ) : (
              <>
                <span className="font-mono-retro text-[12px] tracking-[0.1em] uppercase text-[#9A9590] flex-shrink-0">
                  Posição <span className="text-[#7DD5D8] text-[15px] font-bold">#{seqIdx + 1}</span> de {sequence.length}
                </span>
                <div className="flex gap-[6px] items-center flex-1 justify-end flex-wrap">
                  <button
                    type="button"
                    disabled={seqIdx === 0}
                    onClick={() => onMoveSeq(evidence.id, -1)}
                    aria-label="Mover para antes"
                    className="w-[34px] h-[34px] rounded-[7px] bg-transparent border border-[#303030] text-[#F2EAE0] cursor-pointer text-[15px] flex items-center justify-center hover:bg-[#181818] disabled:opacity-25 disabled:cursor-default transition-colors"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    disabled={seqIdx === sequence.length - 1}
                    onClick={() => onMoveSeq(evidence.id, 1)}
                    aria-label="Mover para depois"
                    className="w-[34px] h-[34px] rounded-[7px] bg-transparent border border-[#303030] text-[#F2EAE0] cursor-pointer text-[15px] flex items-center justify-center hover:bg-[#181818] disabled:opacity-25 disabled:cursor-default transition-colors"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveFromSeq(evidence.id)}
                    className="h-[34px] px-[12px] rounded-[7px] bg-transparent border border-[#303030] text-[#9A9590] cursor-pointer text-[12px] font-mono-retro hover:border-[#E57373] hover:text-[#E57373] transition-all"
                  >
                    Remover
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
