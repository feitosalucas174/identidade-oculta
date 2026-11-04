import React, { useState, useEffect } from 'react';
import { FileText, RotateCcw, AlertTriangle } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';

interface DetectiveDefeatModalProps {
  isOpen: boolean;
  onReview: () => void;
  onRestart: () => void;
}

const BASE_URL = import.meta.env.BASE_URL;

export const DetectiveDefeatModal: React.FC<DetectiveDefeatModalProps> = ({
  isOpen,
  onReview,
  onRestart,
}) => {
  useScrollLock(isOpen);

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    setCurrentFrame(0);
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 8);
    }, 260);

    return () => {
      clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2500] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto overscroll-contain touch-pan-y animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Investigação Inconclusiva"
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      <div className="w-full max-w-[560px] bg-[#0c0d10] border-2 border-[#2b2d36] rounded-[16px] shadow-[0_16px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col my-auto relative">
        
        <div className="bg-[#07080a] border-b border-[#1f2128] p-[12px_18px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#d94040]" />
            <span className="font-mono-retro text-[11px] sm:text-[12px] tracking-[0.16em] uppercase text-[#d94040] font-bold">
              CASO NÃO SOLUCIONADO · 1995
            </span>
          </div>

          <span className="font-mono-retro text-[10px] tracking-[0.08em] text-[#9A9590] uppercase">
            RANCHO ESPERANÇA
          </span>
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-4">
          
          <div className="text-center flex flex-col items-center">
            <h2 className="font-brunson text-[30px] sm:text-[38px] uppercase tracking-[0.04em] leading-[0.95] text-[#F2EAE0] mb-2.5">
              Investigação<br />Inconclusiva
            </h2>
            <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#b0a89c] leading-[1.7] italic max-w-[460px]">
              "O caso permanece um mistério nas sombras. As evidências reunidas até o momento ainda deixam lacunas sobre o que realmente aconteceu no rancho. Seis vidas foram ceifadas, e a verdade continua oculta."
            </p>
          </div>

          <div className="relative h-[250px] sm:h-[280px] w-full bg-[#000000] border border-[#20222a] rounded-[12px] flex items-center justify-center overflow-hidden">

            {Array.from({ length: 8 }, (_, i) => {
              const isCurrent = i === currentFrame;
              return (
                <img
                  key={i}
                  src={`${BASE_URL}assets/detetive_derrota/frame_${String(i).padStart(2, '0')}.png`}
                  alt="Detetive desolado sob a luz da rua"
                  className={`absolute inset-0 m-auto h-[240px] sm:h-[270px] w-auto object-contain image-rendering-pixelated ${
                    isCurrent ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
                  style={{ imageRendering: 'pixelated' }}
                />
              );
            })}

            <div className="absolute bottom-2.5 right-3 z-30 font-mono-retro text-[9px] uppercase tracking-[0.14em] text-[#9A9590] bg-[#0c0d10]/85 px-2 py-0.5 rounded border border-[#20222a]">
              DETETIVE · SEM CONCLUSÃO
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <button
              type="button"
              onClick={onReview}
              className="w-full h-[48px] rounded-[10px] bg-[#7DD5D8] text-[#0D0D0D] font-mono-retro text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.08em] cursor-pointer hover:bg-[#9DE0E3] transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(125,213,216,0.3)]"
            >
              <FileText className="w-4 h-4 text-[#0D0D0D]" />
              <span>Ver Laudo e Corrigir Fichas</span>
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="w-full h-[42px] rounded-[10px] bg-transparent border border-[#3e1a1a] text-[#d94040] font-mono-retro text-[11px] uppercase tracking-[0.08em] cursor-pointer hover:bg-[#220d0d] hover:border-[#602020] transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tentar Novamente do Zero</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
