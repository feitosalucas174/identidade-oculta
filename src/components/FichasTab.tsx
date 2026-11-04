import React, { useMemo } from 'react';
import { Hash, MapPin, Clock, AlertOctagon, UserCheck, ShieldAlert } from 'lucide-react';
import { AllAnswers, FieldKey } from '../types';
import { GAB, OPCOES, PERS } from '../data/evidence';
import { DossierDropdown } from './DossierDropdown';

interface FichasTabProps {
  answers: AllAnswers;
  fieldStatuses: Record<string, Record<FieldKey, 'ok' | 'err' | 'amb' | undefined>>;
  onAnswerChange: (pid: string, field: FieldKey, val: string) => void;
  onConclude: () => void;
}

export const FichasTab: React.FC<FichasTabProps> = ({
  answers,
  fieldStatuses,
  onAnswerChange,
  onConclude,
}) => {
  const fieldMeta: Record<FieldKey, { label: string; icon: React.ReactNode }> = {
    ordem: {
      label: 'Ordem Cronológica',
      icon: <Hash className="w-3.5 h-3.5 text-[#7DD5D8]" />,
    },
    local: {
      label: 'Local do Corpo',
      icon: <MapPin className="w-3.5 h-3.5 text-[#e09f58]" />,
    },
    quando: {
      label: 'Horário Estimado',
      icon: <Clock className="w-3.5 h-3.5 text-[#8ab4f8]" />,
    },
    como: {
      label: 'Causa da Morte',
      icon: <AlertOctagon className="w-3.5 h-3.5 text-[#e57373]" />,
    },
  };

  // Fixed non-chronological shuffle so players cannot infer timeline order from card order
  const shuffledPers = useMemo(() => {
    const order = ['Marcos', 'Vera', 'Bob', 'Samuel', 'Claudio', 'Denis', 'Monica'];
    return order
      .map(id => PERS.find(p => p.id === id))
      .filter((p): p is (typeof PERS)[0] => p !== undefined);
  }, []);

  // Calculate total answered fields
  let totalFilled = 0;
  PERS.forEach(p => {
    const pAns = answers[p.id];
    if (pAns) {
      if (pAns.ordem) totalFilled++;
      if (pAns.local) totalFilled++;
      if (pAns.quando) totalFilled++;
      if (pAns.como) totalFilled++;
    }
  });

  return (
    <div id="tab-fichas" className="p-4 sm:p-6 max-w-[1400px] mx-auto">
      {/* Dossier Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-[#282b36]">
        <div>
          <div className="font-mono-retro text-[11px] tracking-[0.2em] uppercase text-[#7DD5D8] font-bold flex items-center gap-2">
            <span>Dossiê Policial · Laudos Periciais</span>
          </div>
          <h2 className="font-brunson text-[26px] sm:text-[32px] uppercase tracking-[0.03em] text-[#F2EAE0] leading-none mt-1">
            Fichas dos 7 Personagens
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono-retro text-[12px] text-[#9A9590] bg-[#14151c] px-3 py-1.5 rounded-[8px] border border-[#262832]">
          <UserCheck className="w-4 h-4 text-[#7DD5D8]" />
          <span>{totalFilled} de 28 deduções preenchidas</span>
        </div>
      </div>

      {/* Grid of Dossier Character Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {shuffledPers.map(p => {
          const isEsp = GAB[p.id]?.especial;
          const pAns = answers[p.id] || {};
          let count = 0;
          if (pAns.ordem) count++;
          if (pAns.local) count++;
          if (pAns.quando) count++;
          if (pAns.como) count++;

          const isCardComplete = count === 4;

          return (
            <article
              key={p.id}
              className="relative bg-[#14151b] border-2 border-[#262832] hover:border-[#383d4c] rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col transition-all duration-200"
            >
              {/* Top Colored Folder Header Strip */}
              <div
                className="h-[5px] w-full rounded-t-[12px]"
                style={{ backgroundColor: p.cor }}
              />

              <div className="p-4 sm:p-5 flex flex-col gap-4">
                {/* Character Header Info */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#22242e]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                      style={{ backgroundColor: p.cor }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <div className="font-brunson text-[26px] sm:text-[28px] uppercase tracking-[0.03em] leading-none text-[#F2EAE0] truncate">
                        {p.nome}
                      </div>
                      <div className="font-mono-retro text-[11px] text-[#9A9590] mt-1 flex items-center gap-2">
                        <span>{p.idade} anos</span>
                        {isEsp && (
                          <span className="flex items-center gap-1 text-[#FFB74D] text-[10px] uppercase font-bold bg-[#FFB74D]/10 px-1.5 py-0.5 rounded border border-[#FFB74D]/25">
                            <ShieldAlert className="w-3 h-3" />
                            Ambíguo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Counter Tag */}
                  <span
                    className={`font-mono-retro text-[11px] font-bold px-2 py-1 rounded-[6px] border flex-shrink-0 ${
                      isCardComplete
                        ? 'bg-[#4CAF50]/15 text-[#4CAF50] border-[#4CAF50]/30'
                        : count > 0
                        ? 'bg-[#1e2028] text-[#F2EAE0] border-[#383d4c]'
                        : 'bg-[#181920] text-[#707482] border-[#262832]'
                    }`}
                    aria-live="polite"
                  >
                    {count}/4 campos
                  </span>
                </div>

                {/* 4 Interactive Dropdown Fields */}
                <div className="flex flex-col gap-3.5">
                  {(['ordem', 'local', 'quando', 'como'] as FieldKey[]).map(f => {
                    const val = pAns[f] || '';
                    const status = fieldStatuses[p.id]?.[f];
                    const meta = fieldMeta[f];

                    return (
                      <DossierDropdown
                        key={f}
                        id={`${p.id}-${f}`}
                        label={meta.label}
                        icon={meta.icon}
                        options={OPCOES[f]}
                        value={val}
                        status={status}
                        onChange={(newVal) => onAnswerChange(p.id, f, newVal)}
                      />
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Action Section (non-sticky, appears only at the end of scroll) */}
      <div className="pt-6 pb-12 flex flex-col items-center justify-center gap-2.5 border-t border-[#262832]">
        <button
          type="button"
          onClick={onConclude}
          className="w-full sm:w-auto font-brunson text-[22px] sm:text-[25px] uppercase tracking-[0.05em] bg-[#D94040] text-white border-none rounded-[10px] px-10 py-3.5 min-h-[50px] cursor-pointer hover:bg-[#c03434] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] whitespace-nowrap flex items-center justify-center shadow-[0_4px_16px_rgba(217,64,64,0.35)]"
        >
          Concluir Investigação 🔍
        </button>
        <span className="font-mono-retro text-[11px] text-[#707482] uppercase tracking-[0.12em]">
          Rancho Esperança · Dossiê Pericial 1995
        </span>
      </div>
    </div>
  );
};
