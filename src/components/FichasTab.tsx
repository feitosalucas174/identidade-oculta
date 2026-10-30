import React, { useMemo } from 'react';
import { AllAnswers, FieldKey } from '../types';
import { GAB, OPCOES, PERS } from '../data/evidence';

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
  const labels: Record<FieldKey, string> = {
    ordem: 'Ordem',
    local: 'Local',
    quando: 'Hora',
    como: 'Causa',
  };

  // Fixed non-chronological shuffle so players cannot infer the timeline order from card sequence
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
    <div id="tab-fichas" className="p-[20px_16px]">
      <div className="font-mono-retro text-[11px] tracking-[0.22em] uppercase text-[#9A9590] mb-[16px] flex items-center gap-[10px] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#303030]">
        Fichas do caso — 7 personagens
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[12px] mb-6">
        {shuffledPers.map(p => {
          const isEsp = GAB[p.id]?.especial;
          const pAns = answers[p.id] || {};
          let count = 0;
          if (pAns.ordem) count++;
          if (pAns.local) count++;
          if (pAns.quando) count++;
          if (pAns.como) count++;

          return (
            <article
              key={p.id}
              className="bg-[#181818] rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex flex-col"
            >
              <div className="h-[4px]" style={{ backgroundColor: p.cor }} />
              <div className="p-[16px_18px] flex flex-col gap-[10px]">
                {/* Header */}
                <div className="flex items-center gap-[10px]">
                  <span
                    className="w-[12px] h-[12px] rounded-full flex-shrink-0"
                    style={{ backgroundColor: p.cor }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-brunson text-[24px] uppercase tracking-[0.03em] leading-[0.95] text-[#F2EAE0] truncate">
                      {p.nome}
                    </div>
                    <div className="font-mono-retro text-[12px] text-[#9A9590] mt-[2px]">
                      {p.idade} anos{isEsp ? ' · ambíguo' : ''}
                    </div>
                  </div>
                  <span className="font-mono-retro text-[13px] text-[#9A9590] flex-shrink-0" aria-live="polite">
                    {count}/4
                  </span>
                </div>

                {/* Fields */}
                {(['ordem', 'local', 'quando', 'como'] as FieldKey[]).map(f => {
                  const val = pAns[f] || '';
                  const status = fieldStatuses[p.id]?.[f];
                  let statusClass = 'border-[#303030] text-[#F2EAE0]';
                  if (status === 'ok') statusClass = 'border-[#4CAF50] text-[#4CAF50]';
                  else if (status === 'err') statusClass = 'border-[#E57373] text-[#E57373]';
                  else if (status === 'amb') statusClass = 'border-[#FFB74D] text-[#FFB74D]';

                  return (
                    <div key={f} className="flex items-center gap-[8px]">
                      <label
                        htmlFor={`${p.id}-${f}`}
                        className="font-mono-retro text-[12px] tracking-[0.14em] uppercase text-[#9A9590] w-[54px] flex-shrink-0"
                      >
                        {labels[f]}
                      </label>
                      <select
                        id={`${p.id}-${f}`}
                        value={val}
                        onChange={e => onAnswerChange(p.id, f, e.target.value)}
                        aria-label={`${labels[f]} de ${p.nome}`}
                        className={`flex-1 h-[44px] px-[26px_11px] bg-[#222222] border rounded-[8px] font-inherit text-[14px] cursor-pointer appearance-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] ${statusClass}`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239A9590' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 11px center',
                        }}
                      >
                        {OPCOES[f].map(o => (
                          <option key={o.v} value={o.v} className="bg-[#222222] text-[#F2EAE0]">
                            {o.l}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 pt-[16px] border-t border-[#303030]">
        <span className="font-mono-retro text-[13px] text-[#9A9590]" aria-live="polite">
          {totalFilled} de 28 campos preenchidos
        </span>
        <button
          type="button"
          onClick={onConclude}
          className="w-full sm:w-auto font-brunson text-[20px] sm:text-[23px] uppercase tracking-[0.04em] bg-[#D94040] text-white border-none rounded-[10px] px-6 py-2.5 min-h-[48px] cursor-pointer hover:bg-[#c03434] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] whitespace-nowrap flex items-center justify-center"
        >
          Concluir investigação
        </button>
      </div>
    </div>
  );
};
