import React from 'react';

interface HeaderProps {
  vistasCount: number;
  camposCount: number;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ vistasCount, camposCount, onGoHome }) => {
  return (
    <header className="sticky top-0 z-[100] h-[60px] sm:h-[64px] bg-[#181818] border-b border-[#303030] flex items-center px-3 sm:px-[18px] gap-2.5 sm:gap-[14px]">
      <button
        onClick={onGoHome}
        aria-label="Voltar à tela inicial"
        title="Início"
        className="w-[34px] sm:w-[36px] h-[34px] sm:h-[36px] rounded-[9px] flex-shrink-0 bg-transparent border border-[#303030] text-[#9A9590] hover:text-[#F2EAE0] hover:border-[#9A9590] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] flex items-center justify-center text-[17px] sm:text-[18px] transition-colors"
      >
        ←
      </button>

      <div className="flex-1 min-w-0">
        <p className="font-mono-retro text-[10px] sm:text-[11px] tracking-[0.14em] text-[#9A9590] flex items-center gap-[6px] uppercase truncate">
          <span className="rec-dot" aria-hidden="true" />
          Caso 001-95
        </p>
        <h1 className="font-brunson text-[22px] sm:text-[28px] tracking-[0.05em] uppercase leading-none text-[#F2EAE0] truncate">
          Identidade Oculta
        </h1>
      </div>

      <div className="flex flex-col items-end gap-[2px] font-mono-retro text-[10px] sm:text-[12px] text-[#9A9590] text-right flex-shrink-0" aria-live="polite">
        <span>{vistasCount}/21 ouvidas</span>
        <span>{camposCount}/28 campos</span>
      </div>
    </header>
  );
};
