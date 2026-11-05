import React from 'react';
import { FinalVerificationResult } from '../types';
import { FileText, CheckCircle2, XCircle, AlertCircle, RotateCcw, Home, ArrowLeft } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';

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
  useScrollLock(isOpen);

  if (!isOpen || !result) return null;

  const isPerfect = result.pct >= 85;

  return (
    <div
      id="result"
      role="dialog"
      aria-modal="true"
      aria-label="Laudo Pericial da Investigação"
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md overflow-y-auto overscroll-contain touch-pan-y p-3 sm:p-6 flex justify-center animate-fadeup"
    >
      <div id="result-box" className="max-w-[760px] w-full my-auto py-4">
        <div className="bg-[#121318] border-2 border-[#2b2d38] rounded-[18px] shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden">
          
          <div className="bg-[#07080a] border-b border-[#20222a] p-[14px_20px] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7DD5D8]" />
              <span className="font-mono-retro text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#7DD5D8] font-bold">
                SECRETARIA DE SEGURANÇA PÚBLICA · POLÍCIA TÉCNICA 1995
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar e revisar fichas"
              className="w-[34px] h-[34px] rounded-full bg-[#1b1c24] border border-[#343846] text-[#F2EAE0] text-[18px] cursor-pointer flex items-center justify-center hover:bg-[#d94040] hover:text-white hover:border-[#d94040] transition-colors leading-none flex-shrink-0"
              title="Fechar laudo pericial"
            >
              ×
            </button>
          </div>

          <div className="p-4 sm:p-7 flex flex-col gap-5">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#232530]">
              <div>
                <span className="font-mono-retro text-[10px] sm:text-[11px] tracking-[0.2em] text-[#9A9590] uppercase font-bold">
                  AUTÓPSIA & CONGRUÊNCIA DE DADOS · CASO Nº 139
                </span>
                <h2 className="font-brunson text-[34px] sm:text-[46px] uppercase tracking-[0.03em] leading-[0.95] text-[#F2EAE0] mt-1">
                  Laudo Pericial
                </h2>
              </div>

              <div
                className="inline-flex items-center gap-2 font-mono-retro text-[11px] sm:text-[13px] tracking-[0.22em] uppercase border-2 px-4 py-2 rounded-[8px] -rotate-[1.5deg] origin-left font-bold shadow-md bg-[#0a0b0e]"
                style={{ color: result.color, borderColor: result.color }}
              >
                <span>{result.stamp}</span>
              </div>
            </div>

            <div className="bg-[#090a0d] border-2 border-[#232632] rounded-[14px] p-4 sm:p-5 flex flex-col gap-4 shadow-inner">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <div className="bg-[#14161f] border border-[#2d3142] px-4 py-2.5 rounded-[10px] text-center w-full sm:w-auto sm:min-w-[130px] flex sm:flex-col items-center justify-between sm:justify-center gap-2 sm:gap-0 shadow-sm">
                    <span className="font-brunson text-[38px] sm:text-[50px] leading-none text-[#F2EAE0]">
                      {result.scoreCor}/{result.scoreTot}
                    </span>
                    <span className="font-mono-retro text-[10px] sm:text-[9px] uppercase tracking-[0.14em] text-[#7DD5D8] font-bold">
                      Campos Validados
                    </span>
                  </div>

                  <div className="font-mono-retro text-[12px] sm:text-[13px] text-[#a0a0b0] leading-[1.6] flex flex-col gap-1.5 bg-[#12141c] sm:bg-transparent p-3 sm:p-0 rounded-[9px] border sm:border-none border-[#222532]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4CAF50] flex-shrink-0" />
                      <span><strong className="text-[#F2EAE0]">{result.scoreCor} de {result.scoreTot}</strong> acertos nas Fichas</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#7DD5D8]">
                      <span className="w-2 h-2 rounded-full bg-[#7DD5D8] flex-shrink-0" />
                      <span><strong className="text-[#F2EAE0]">{result.seqHits} de 21</strong> fitas na Sequência</span>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-[220px] flex flex-col gap-2 bg-[#12141c] p-3 rounded-[10px] border border-[#232634]">
                  <div>
                    <div className="flex justify-between font-mono-retro text-[10px] text-[#a0a0b0] font-bold mb-1 uppercase">
                      <span>Fichas dos Personagens</span>
                      <span style={{ color: result.color }}>{result.pct}%</span>
                    </div>
                    <div className="w-full bg-[#08090c] h-2 rounded-full overflow-hidden border border-[#20222e]">
                      <div
                        className="h-full transition-all duration-500"
                        style={{ width: `${result.pct}%`, backgroundColor: result.color }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-mono-retro text-[10px] text-[#a0a0b0] font-bold mb-1 uppercase">
                      <span>Sequência de Fitas VHS</span>
                      <span className="text-[#7DD5D8]">{result.seqPct}%</span>
                    </div>
                    <div className="w-full bg-[#08090c] h-2 rounded-full overflow-hidden border border-[#20222e]">
                      <div
                        className="h-full bg-[#7DD5D8] transition-all duration-500"
                        style={{ width: `${result.seqPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="font-mono-retro text-[12px] sm:text-[13px] text-[#d4cfc5] leading-[1.7] bg-[#14151c] p-3.5 rounded-[10px] border border-[#262836]"
                dangerouslySetInnerHTML={{ __html: result.info }}
              />
            </div>

            <div id="res-detalhe" className="flex flex-col gap-4">
              <div className="font-mono-retro text-[11px] tracking-[0.16em] uppercase text-[#7DD5D8] font-bold flex items-center gap-2 pb-1 border-b border-[#232530]">
                <span>📋 ANÁLISE DETALHADA POR PERSONAGEM</span>
              </div>

              {result.details.map(({ p, campos, especial }) => (
                <div
                  key={p.id}
                  className="bg-[#090a0d] border-2 border-[#232632] rounded-[14px] overflow-hidden shadow-md"
                >
                  <div
                    className="p-[10px_16px] flex items-center justify-between border-b border-[#20222e]"
                    style={{
                      borderLeft: `5px solid ${p.cor}`,
                      backgroundColor: `${p.cor}15`,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: p.cor }}
                      />
                      <h3
                        className="font-brunson text-[22px] sm:text-[26px] tracking-[0.04em] uppercase leading-none"
                        style={{ color: p.cor }}
                      >
                        {p.nome}
                      </h3>
                    </div>

                    <span className="font-mono-retro text-[10px] tracking-[0.12em] uppercase text-[#808095] bg-[#14151e] px-2.5 py-1 rounded border border-[#262836] font-semibold">
                      DOSSIÊ · {p.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-[#0d0e12]">
                    {campos.map((c, idx) => {
                      const isOk = c.cls === 'ok';
                      const isErr = c.cls === 'err';
                      const isAmb = c.cls === 'amb';

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-[10px] border-2 font-mono-retro flex flex-col gap-1 transition-all ${
                            isOk
                              ? 'bg-[#0b160e] border-[#1e4028] text-[#e0f7e4]'
                              : isErr
                              ? 'bg-[#1c0d0f] border-[#4a1c1e] text-[#fce8e8]'
                              : 'bg-[#18140a] border-[#4a3d1c] text-[#fef5e6]'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-1 border-b border-white/10">
                            <span className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#a0a0b0]">
                              {c.label}
                            </span>

                            {isOk && (
                              <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#4CAF50] flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Validado
                              </span>
                            )}
                            {isErr && (
                              <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#E57373] flex items-center gap-1">
                                <XCircle className="w-3 h-3" />
                                Divergência
                              </span>
                            )}
                            {isAmb && (
                              <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#FFB74D] flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Ambíguo
                              </span>
                            )}
                          </div>

                          <div className="text-[13px] font-bold mt-1 leading-snug">
                            "{c.val || '— não respondido —'}"
                          </div>

                          {isErr && c.hint && (
                            <div className="mt-2 bg-[#0d0708] border border-[#602528] p-2 rounded-[6px] text-[11px] text-[#f5a6a6] leading-[1.5] italic">
                              💡 <strong>Pista do Laudo:</strong> {c.hint}
                            </div>
                          )}

                          {isAmb && (
                            <div className="mt-2 bg-[#120f06] border border-[#604f25] p-2 rounded-[6px] text-[11px] text-[#ffd699] leading-[1.5] italic">
                              ⚠ As evidências disponíveis não permitem distinguir qual dos dois foi a vítima do confronto final.
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {especial && (
                    <div className="bg-[#141208] border-t border-[#3d3315] p-3 text-[11px] text-[#ffd899] font-mono-retro italic leading-[1.6]">
                      ⚠ A morte de {p.nome} é intencionalmente ambígua conforme as evidências disponíveis. Tanto Vera quanto Cláudio são aceitos como resposta válida para o confronto das 5h40.
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 pt-3 border-t border-[#232530]">
              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[48px] px-4 rounded-[12px] bg-[#7DD5D8] text-[#0D0D0D] font-mono-retro text-[13px] font-bold uppercase tracking-[0.08em] cursor-pointer hover:bg-[#9DE0E3] transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(125,213,216,0.25)]"
              >
                <ArrowLeft className="w-4 h-4 text-[#0D0D0D]" />
                <span>Voltar para Corrigir Fichas</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={onRestart}
                  className="w-full h-[44px] px-3 rounded-[10px] bg-[#1a1c24] border border-[#343848] text-[#F2EAE0] hover:text-white hover:border-[#7DD5D8] font-mono-retro text-[11px] uppercase tracking-[0.08em] font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar do Zero</span>
                </button>

                <button
                  type="button"
                  onClick={onGoHome}
                  className="w-full h-[44px] px-3 rounded-[10px] bg-transparent border border-[#2b2d38] text-[#9A9590] hover:text-[#F2EAE0] hover:border-[#606070] font-mono-retro text-[11px] uppercase tracking-[0.08em] cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Tela Inicial</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
