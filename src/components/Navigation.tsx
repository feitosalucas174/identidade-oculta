import React from 'react';

export type TabType = 'fitas' | 'seq' | 'fichas';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unseenCount: number;
  sequenceCount: number;
  camposCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  unseenCount,
  sequenceCount,
  camposCount,
}) => {
  return (
    <nav
      id="nav"
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-[150] h-[66px] bg-[#181818] border-t border-[#303030] flex items-stretch pb-[env(safe-area-inset-bottom,0px)]"
    >
      {/* Fitas Tab */}
      <button
        type="button"
        onClick={() => onTabChange('fitas')}
        aria-label="Fitas de evidência"
        className={`flex-1 flex flex-col items-center justify-center gap-[3px] bg-transparent border-none cursor-pointer transition-colors border-t-2 relative py-[6px] px-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] ${
          activeTab === 'fitas'
            ? 'text-[#7DD5D8] border-t-[#7DD5D8]'
            : 'text-[#9A9590] border-t-transparent hover:text-[#F2EAE0]'
        }`}
      >
        <span className="w-5 h-5 flex items-center justify-center" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="7" height="7" rx="1.5" />
            <rect x="11" y="2" width="7" height="7" rx="1.5" />
            <rect x="2" y="11" width="7" height="7" rx="1.5" />
            <rect x="11" y="11" width="7" height="7" rx="1.5" />
          </svg>
        </span>
        <span className="font-mono-retro text-[11px] tracking-[0.1em] uppercase">Fitas</span>
        {unseenCount > 0 && (
          <span className="absolute top-[5px] right-[calc(50%-20px)] bg-[#D94040] text-white font-mono-retro text-[9px] font-bold px-[5px] py-[1px] rounded-[8px] leading-[1.4]">
            {unseenCount}
          </span>
        )}
      </button>

      {/* Sequência Tab */}
      <button
        type="button"
        onClick={() => onTabChange('seq')}
        aria-label="Linha do tempo"
        className={`flex-1 flex flex-col items-center justify-center gap-[3px] bg-transparent border-none cursor-pointer transition-colors border-t-2 relative py-[6px] px-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] ${
          activeTab === 'seq'
            ? 'text-[#7DD5D8] border-t-[#7DD5D8]'
            : 'text-[#9A9590] border-t-transparent hover:text-[#F2EAE0]'
        }`}
      >
        <span className="w-5 h-5 flex items-center justify-center" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="2" y1="10" x2="18" y2="10" />
            <circle cx="5" cy="10" r="2.5" fill="currentColor" stroke="none" />
            <circle cx="10" cy="10" r="2.5" fill="currentColor" stroke="none" />
            <circle cx="15" cy="10" r="2.5" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span className="font-mono-retro text-[11px] tracking-[0.1em] uppercase">Sequência</span>
        {sequenceCount > 0 && (
          <span className="absolute top-[5px] right-[calc(50%-20px)] bg-[#D94040] text-white font-mono-retro text-[9px] font-bold px-[5px] py-[1px] rounded-[8px] leading-[1.4]">
            {sequenceCount}
          </span>
        )}
      </button>

      {/* Fichas Tab */}
      <button
        type="button"
        onClick={() => onTabChange('fichas')}
        aria-label="Fichas dos personagens"
        className={`flex-1 flex flex-col items-center justify-center gap-[3px] bg-transparent border-none cursor-pointer transition-colors border-t-2 relative py-[6px] px-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] ${
          activeTab === 'fichas'
            ? 'text-[#7DD5D8] border-t-[#7DD5D8]'
            : 'text-[#9A9590] border-t-transparent hover:text-[#F2EAE0]'
        }`}
      >
        <span className="w-5 h-5 flex items-center justify-center" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="14" height="13" rx="2" />
            <line x1="7" y1="8" x2="13" y2="8" />
            <line x1="7" y1="12" x2="11" y2="12" />
          </svg>
        </span>
        <span className="font-mono-retro text-[11px] tracking-[0.1em] uppercase">Fichas</span>
        {camposCount > 0 && (
          <span className="absolute top-[5px] right-[calc(50%-20px)] bg-[#D94040] text-white font-mono-retro text-[9px] font-bold px-[5px] py-[1px] rounded-[8px] leading-[1.4]">
            {camposCount}
          </span>
        )}
      </button>
    </nav>
  );
};
