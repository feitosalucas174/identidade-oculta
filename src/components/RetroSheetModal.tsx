import React from 'react';

interface RetroSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RetroSheetModal: React.FC<RetroSheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[700] bg-black/80 flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black shadow-2xl flex flex-col">
        {/* Title bar */}
        <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between font-mono-retro font-bold text-xs select-none">
          <div className="flex items-center gap-1">
            <span>📊</span>
            <span>RetroSheet 95 — CONTROLE_DESPESAS_PRODUCAO.XLS</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-5 h-5 bg-[#c0c0c0] text-black border border-t-white border-l-white border-r-black border-b-black flex items-center justify-center text-xs font-bold hover:bg-[#d4d0c8] active:border-t-black active:border-l-black active:border-r-white active:border-b-white leading-none"
          >
            ✕
          </button>
        </div>

        {/* Content iframe */}
        <div className="flex-1 w-full bg-[#008080] p-1 overflow-hidden">
          <iframe
            src="/retrosheet-95.html"
            title="RetroSheet 95"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
};
