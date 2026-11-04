import React, { useState, useEffect, useRef } from 'react';
import { FileText, RotateCcw, Trophy, Sparkles } from 'lucide-react';

interface DetectiveVictoryModalProps {
  isOpen: boolean;
  onReview: () => void;
  onRestart: () => void;
}

export const DetectiveVictoryModal: React.FC<DetectiveVictoryModalProps> = ({
  isOpen,
  onReview,
  onRestart,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load animation sheet on mount
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/aistudio/Detetive_Pixelado_no_Ref_gio_Aconchegante_674d8c38.png';
    img.onload = () => {
      imgRef.current = img;
    };
  }, []);

  // Lock body scroll and frame loop animation across 8 frames (220ms per frame)
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    setCurrentFrame(0);
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 8);
    }, 220);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isOpen]);

  // Draw current frame onto canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = 4;
    const rows = 2;
    const frameW = img.width / cols;
    const frameH = img.height / rows;

    const col = currentFrame % cols;
    const row = Math.floor(currentFrame / cols);

    canvas.width = frameW;
    canvas.height = frameH;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, frameW, frameH);
    ctx.drawImage(
      img,
      col * frameW,
      row * frameH,
      frameW,
      frameH,
      0,
      0,
      frameW,
      frameH
    );
  }, [currentFrame, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2500] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Investigação Solucionada"
    >
      <div className="w-full max-w-[560px] bg-[#0c0d10] border-2 border-[#1e4840] rounded-[16px] shadow-[0_16px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col my-auto relative">
        
        {/* Header Bar */}
        <div className="bg-[#070b09] border-b border-[#183a33] p-[12px_18px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#7DD5D8]" />
            <span className="font-mono-retro text-[11px] sm:text-[12px] tracking-[0.16em] uppercase text-[#7DD5D8] font-bold">
              CASO SOLUCIONADO · 1995
            </span>
          </div>

          <span className="font-mono-retro text-[10px] tracking-[0.08em] text-[#D4AF37] uppercase font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            ARQUIVO CONCLUÍDO
          </span>
        </div>

        {/* Modal Main Content */}
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          
          {/* Headline & Narrative Box */}
          <div className="text-center flex flex-col items-center">
            <h2 className="font-brunson text-[32px] sm:text-[40px] uppercase tracking-[0.04em] leading-[0.95] text-[#7DD5D8] mb-2.5 drop-shadow-[0_2px_10px_rgba(125,213,216,0.3)]">
              Investigação<br />Solucionada!
            </h2>
            <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#c2cfcd] leading-[1.7] italic max-w-[460px]">
              "Um brinde à verdade! Todas as evidências foram conectadas com precisão pericial e a linha do tempo do Rancho Esperança foi completamente desvendada. O mistério acabou."
            </p>
          </div>

          {/* Detective Animation by the Fireplace (Pure #000000 solid background matching the defeat style) */}
          <div className="relative h-[250px] sm:h-[280px] w-full bg-[#000000] border border-[#20222a] rounded-[12px] flex items-center justify-center overflow-hidden">
            
            <canvas
              ref={canvasRef}
              className="h-[240px] sm:h-[270px] w-auto object-contain"
              style={{ imageRendering: 'pixelated' }}
            />

            {/* Stamp / Tag overlay */}
            <div className="absolute bottom-2.5 right-3 z-30 font-mono-retro text-[9px] uppercase tracking-[0.14em] text-[#D4AF37] bg-[#0c0d10]/90 px-2.5 py-1 rounded border border-[#3d2e14] font-bold shadow-md">
              DETETIVE · CASO RESOLVIDO 🥂
            </div>
          </div>

          {/* Action Buttons Panel */}
          <div className="flex flex-col gap-2.5 pt-1">
            {/* Review Laudo Action */}
            <button
              type="button"
              onClick={onReview}
              className="w-full h-[48px] rounded-[10px] bg-[#7DD5D8] text-[#0D0D0D] font-mono-retro text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.08em] cursor-pointer hover:bg-[#9DE0E3] transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(125,213,216,0.3)]"
            >
              <FileText className="w-4 h-4 text-[#0D0D0D]" />
              <span>Ver Laudo Final de Autópsia</span>
            </button>

            {/* Restart Action */}
            <button
              type="button"
              onClick={onRestart}
              className="w-full h-[42px] rounded-[10px] bg-transparent border border-[#2b2d38] text-[#9A9590] font-mono-retro text-[11px] uppercase tracking-[0.08em] cursor-pointer hover:text-[#F2EAE0] hover:border-[#606070] transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Jogar Novamente (Reiniciar Caso)</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
