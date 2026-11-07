import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, FastForward, Search, ShieldAlert, Sparkles } from 'lucide-react';

interface BriefingSlide {
  title: string;
  text: string;
  frames: number[]; // Index of frames from public/assets/detetive/frame_XX.png
  badge: string;
}

const BRIEFING_SLIDES: BriefingSlide[] = [
  {
    badge: 'RELATÓRIO INICIAL',
    title: 'O Chamado no Rancho Esperança',
    text: 'Detetive na área. No dia 13 de outubro de 1995, uma equipe de cinema independente desapareceu no isolado Rancho Esperança. A polícia encontrou o local intacto, mas repleto de marcas de sangue e pistas espalhadas.',
    frames: [0, 1, 2, 3],
  },
  {
    badge: 'EVIDÊNCIAS COLETADAS',
    title: 'As 20 Evidências e Achados',
    text: 'Encontramos 20 evidências naquela noite e gravamos fitas para auxiliar na investigação. Cada fotografia de cena, documento e áudio gravado contém detalhes valiosos para reconstruir o que realmente aconteceu naquele rancho.',
    frames: [4, 5, 6, 7],
  },
  {
    badge: 'DIRETRIZES DA MISSÃO',
    title: 'Seu Objetivo Investigativo',
    text: 'Sua Missão é dupla: primeiro, ordenar as 20 fitas na Linha do Tempo cronológica. Segundo, preencher as fichas das 7 vítimas determinando a ordem da morte, local, horário e causa precisa.',
    frames: [8, 9, 10, 11],
  },
  {
    badge: 'ALERTA DO DETETIVE',
    title: 'A Busca pela Verdade',
    text: 'Preste atenção aos detalhes nas fotos e escute atentamente os relatos em áudio do gravador policial. As aparências enganam... Boa sorte, investigador. O caso está em suas mãos.',
    frames: [12, 13, 14, 15],
  },
];

interface DetectiveBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BASE_URL = import.meta.env.BASE_URL;

export const DetectiveBriefingModal: React.FC<DetectiveBriefingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentFrameInSlide, setCurrentFrameInSlide] = useState(0);

  // Always reset to the first card when the report is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentSlideIndex(0);
      setCurrentFrameInSlide(0);
    }
  }, [isOpen]);

  const slide = BRIEFING_SLIDES[currentSlideIndex];

  // Animate detective frame transitions (~450ms per frame)
  useEffect(() => {
    if (!isOpen) return;

    setCurrentFrameInSlide(0);
    const interval = setInterval(() => {
      setCurrentFrameInSlide((prev) => (prev + 1) % slide.frames.length);
    }, 450);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlideIndex, isOpen, slide.frames.length]);

  if (!isOpen) return null;

  const activeFrameIdx = slide.frames[currentFrameInSlide];

  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === BRIEFING_SLIDES.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      onClose();
    } else {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstSlide) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/85 backdrop-blur-md flex items-start sm:items-center justify-center p-3 sm:p-5 overflow-y-auto overscroll-y-contain touch-pan-y [webkit-overflow-scrolling:touch] animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Relatório Inicial do Detetive"
    >
      <div className="w-full max-w-[620px] bg-[#16171b] border-2 border-[#2d3038] rounded-[16px] shadow-[0_12px_50px_rgba(0,0,0,0.85)] flex flex-col my-0 sm:my-auto relative shrink-0">
        
        {/* Header Bar */}
        <div className="bg-[#0f1013] border-b border-[#282b33] p-[12px_16px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldAlert className="w-4 h-4 text-[#d94040] flex-shrink-0" />
            <span className="font-mono-retro text-[11px] sm:text-[12px] tracking-[0.14em] uppercase text-[#F2EAE0] font-bold truncate">
              RELATÓRIO INICIAL · CASO #1995-1013
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Pular introdução e ir direto ao jogo"
            aria-label="Pular introdução"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#22252e] hover:bg-[#2e3340] border border-[#383e4e] font-mono-retro text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-[#9A9590] hover:text-[#F2EAE0] cursor-pointer transition-colors flex-shrink-0"
          >
            <span>Pular Introdução</span>
            <FastForward className="w-3.5 h-3.5 text-[#d94040]" />
          </button>
        </div>

        {/* Modal Main Area */}
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          
          {/* Slide Progress Pills */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono-retro text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#7DD5D8] font-semibold bg-[#0f1115] px-2.5 py-1 rounded-[4px] border border-[#222630]">
              {slide.badge}
            </span>
            <div className="flex items-center gap-1.5">
              {BRIEFING_SLIDES.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlideIndex
                      ? 'w-6 bg-[#d94040] shadow-[0_0_8px_rgba(217,64,64,0.6)]'
                      : idx < currentSlideIndex
                      ? 'w-2 bg-[#7DD5D8]'
                      : 'w-2 bg-[#2a2e38]'
                  }`}
                />
              ))}
              <span className="font-mono-retro text-[11px] text-[#9A9590] ml-1.5 font-bold">
                {currentSlideIndex + 1}/{BRIEFING_SLIDES.length}
              </span>
            </div>
          </div>

          {/* Speech / Dialogue Box */}
          <div className="bg-[#1e1a16] border-2 border-[#3d3328] rounded-[12px] p-4 sm:p-5 relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
            <div className="font-mono-retro text-[10px] text-[#b39566] tracking-[0.1em] uppercase mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#d9ac66]" />
              <span>Instruções do Detetive</span>
            </div>
            
            <h3 className="font-brunson text-[24px] sm:text-[28px] uppercase tracking-[0.03em] leading-tight text-[#F2EAE0] mb-2">
              {slide.title}
            </h3>

            <p className="font-mono-retro text-[13px] sm:text-[14px] text-[#d9c49c] leading-[1.7] italic">
              "{slide.text}"
            </p>

            {/* Speech bubble tail pointing down toward detective */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-[#3d3328]" />
          </div>

          {/* Detective Pixel Art Character Showcase (Pre-rendered stack, zero blinking) */}
          <div className="relative h-[190px] sm:h-[220px] bg-gradient-to-b from-[#0b0c0e] via-[#12141a] to-[#1a1c24] border border-[#282c38] rounded-[12px] flex items-center justify-center overflow-hidden shadow-inner">
            {/* Ambient Background Grid / Light Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,64,64,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#16171b] to-transparent pointer-events-none z-20" />

            {/* Pre-rendered frame stack: All frames remain mounted so transitions are instant with zero blinking */}
            {Array.from({ length: 16 }, (_, i) => {
              const isCurrent = i === activeFrameIdx;
              return (
                <img
                  key={i}
                  src={`${BASE_URL}assets/detetive/frame_${String(i).padStart(2, '0')}.png`}
                  alt="Detetive em Pixel Art"
                  className={`absolute inset-0 m-auto h-[180px] sm:h-[210px] w-auto object-contain image-rendering-pixelated ${
                    isCurrent ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
                  style={{ imageRendering: 'pixelated' }}
                />
              );
            })}

            {/* Subtitle tag */}
            <div className="absolute bottom-2 left-3 z-30 font-mono-retro text-[9px] uppercase tracking-[0.14em] text-[#9A9590] bg-[#0d0e11]/80 px-2 py-0.5 rounded border border-[#22252e]">
              DETETIVE RESPONSÁVEL · DEPOIMENTO #{currentSlideIndex + 1}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirstSlide}
              className="h-[44px] px-4 rounded-[8px] bg-[#22252e] border border-[#323746] text-[#F2EAE0] font-mono-retro text-[12px] uppercase tracking-[0.08em] font-bold cursor-pointer hover:bg-[#2c313f] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={`h-[44px] px-5 rounded-[8px] font-mono-retro text-[12px] sm:text-[13px] uppercase tracking-[0.08em] font-bold cursor-pointer transition-all flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.4)] ${
                isLastSlide
                  ? 'bg-[#d94040] text-white hover:bg-[#c03434] shadow-[0_0_15px_rgba(217,64,64,0.4)]'
                  : 'bg-[#7DD5D8] text-[#0D0D0D] hover:bg-[#9DE0E3]'
              }`}
            >
              {isLastSlide ? (
                <>
                  <span>Iniciar Missão</span>
                  <Search className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Próximo</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
