import React, { useEffect } from 'react';
import { FinalVerificationResult } from '../types';

interface ResultModalProps {
  result: FinalVerificationResult | null;
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onGoHome: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  result,
  isOpen,
  onClose,
  onRestart,
  onGoHome,
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !result) return null;

  return (
    <div
      id="result"
      role="dialog"
      aria-modal="true"
      aria-label="Resultado da investigação"
      className="fixed inset-0 z-[2000] bg-[#0D0D0D] overflow-y-auto p-4 sm:p-6 flex justify-center animate-fadeup"
    >
      <div id="result-box" className="max-w-[680px] w-full pt-2 pb-12 my-auto">
        {/* Top Header with Close Button */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#303030]">
          <div className="font-mono-retro text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-[#7DD5D8] font-bold">
            Laudo Pericial Final
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar e revisar fichas"
            className="w-[36px] h-[36px] rounded-full bg-[#222222] border border-[#303030] text-[#F2EAE0] text-[20px] cursor-pointer flex items-center justify-center hover:bg-[#3A1010] hover:text-[#E57373] transition-colors leading-none"
            title="Fechar resultado"
          >
            ×
          </button>
        </div>

        <h2 className="font-brunson text-[36px] sm:text-[50px] uppercase tracking-[0.04em] leading-[0.9] text-[#F2EAE0] mb-3">
          Resultado da<br />Investigação
        </h2>

        {/* Rubber Stamp */}
        <div
          className="inline-block mb-4 sm:mb-5 font-mono-retro text-[11px] sm:text-[13px] tracking-[0.25em] sm:tracking-[0.3em] uppercase border px-[14px] sm:px-[18px] py-[4px] sm:py-[5px] -rotate-[1.5deg] origin-left font-bold shadow-sm"
          style={{ color: result.color, borderColor: result.color }}
        >
          {result.stamp}
        </div>

        {/* Score Block */}
        <div className="bg-[#181818] border border-[#303030] border-l-[4px] border-l-[#7DD5D8] p-4 sm:p-[18px_22px] mb-5 rounded-r-lg flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-[20px] shadow-md">
          <span className="font-brunson text-[48px] sm:text-[56px] leading-none text-[#F2EAE0] flex-shrink-0">
            {result.scoreCor}/{result.scoreTot}
          </span>
          <div className="font-mono-retro text-[12px] sm:text-[13px] text-[#9A9590] leading-[1.8]">
            <strong className="text-[#F2EAE0]">{result.pct}% fichas</strong> · <strong className="text-[#F2EAE0]">{result.seqPct}% sequência</strong>
            <br />
            {result.scoreCor} de {result.scoreTot} campos · {result.seqHits} de 21 fitas na ordem
            <br />
            <span className="inline-block mt-1 text-[#F2EAE0]" dangerouslySetInnerHTML={{ __html: result.info }} />
          </div>
        </div>

        {/* Details list */}
        <div id="res-detalhe" className="flex flex-col gap-3.5 mb-6">
          {result.details.map(({ p, campos, especial }) => (
            <div key={p.id} className="bg-[#181818] border border-[#303030] rounded-lg overflow-hidden shadow-sm">
              <div
                className="p-[8px_14px] font-brunson text-[20px] tracking-[0.05em] uppercase border-b border-[#303030]"
                style={{
                  color: p.cor,
                  backgroundColor: `${p.cor}18`,
                  borderLeft: `4px solid ${p.cor}`,
                }}
              >
                {p.nome}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-[#303030]">
                {campos.map((c, idx) => {
                  let bgClass = 'bg-[#181818]';
                  if (c.cls === 'ok') bgClass = 'bg-[#060e06] text-[#4CAF50]';
                  else if (c.cls === 'err') bgClass = 'bg-[#0e0606] text-[#E57373]';
                  else if (c.cls === 'amb') bgClass = 'bg-[#0e0d06] text-[#FFB74D]';

                  return (
                    <div key={idx} className={`p-[9px_13px] text-[12px] font-mono-retro ${bgClass}`}>
                      <div className="text-[#9A9590] text-[9px] uppercase tracking-[0.15em] mb-[3px]">
                        {c.label}
                      </div>
                      <div className="font-semibold">
                        {c.cls === 'ok' ? '✓ ' : c.cls === 'err' ? '✗ ' : '? '}
                        "{c.val}"
                      </div>
                      {c.cls === 'err' && c.hint && (
                        <div className="text-[#9A9590] text-[11px] mt-[4px] italic">
                          → {c.hint}
                        </div>
                      )}
                      {c.cls === 'amb' && (
                        <div className="text-[#9A9590] text-[11px] mt-[4px] italic">
                          → ambíguo — ambos aceitos
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {especial && (
                <div className="bg-[#0e0d06] border-l-2 border-l-[#7DD5D8] p-[10px_14px] text-[11px] text-[#9A9590] m-1 leading-[1.7] italic font-mono-retro">
                  ⚠ A morte de {p.nome} é intencionalmente ambígua — E-21 confirma que a vítima final não pôde ser identificada. Vera e Cláudio são ambos resposta válida.
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#222222] border border-[#7DD5D8] text-[#7DD5D8] font-mono-retro text-[13px] tracking-[0.08em] uppercase p-3.5 cursor-pointer rounded-[10px] hover:bg-[#181818] transition-colors whitespace-nowrap flex items-center justify-center font-bold"
          >
            ← Voltar para revisar fichas
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full bg-[#D94040] border-none text-white font-brunson text-[22px] sm:text-[26px] tracking-[0.04em] uppercase p-[14px] cursor-pointer rounded-[10px] hover:bg-[#c03434] transition-colors whitespace-nowrap flex items-center justify-center shadow-md"
          >
            Jogar novamente
          </button>

          <button
            type="button"
            onClick={onGoHome}
            className="w-full bg-transparent border border-[#303030] text-[#9A9590] font-mono-retro text-[12px] tracking-[0.1em] uppercase p-3 cursor-pointer rounded-[10px] hover:border-[#9A9590] hover:text-[#F2EAE0] transition-colors whitespace-nowrap flex items-center justify-center"
          >
            Voltar à tela inicial
          </button>
        </div>
      </div>
    </div>
  );
};
