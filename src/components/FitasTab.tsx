import React from 'react';
import { Evidence } from '../types';
import { PHOTOS, SVGS } from '../data/evidence';
import { Film } from 'lucide-react';

interface FitasTabProps {
  deck: Evidence[];
  vistas: Set<string>;
  sequence: string[];
  examIdx: number | null;
  onOpenExam: (index: number) => void;
}

export const FitasTab: React.FC<FitasTabProps> = ({
  deck,
  vistas,
  sequence,
  examIdx,
  onOpenExam,
}) => {
  return (
    <div id="tab-fitas" className="p-4 sm:p-6 max-w-[1400px] mx-auto">
      {/* Dossier Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-[#282b36]">
        <div>
          <div className="font-mono-retro text-[11px] tracking-[0.2em] uppercase text-[#7DD5D8] font-bold flex items-center gap-2">
            <Film className="w-3.5 h-3.5 text-[#7DD5D8]" />
            <span>ARQUIVO POLICIAL · FITAS VHS & OBJETOS DE CENA</span>
          </div>
          <h2 className="font-brunson text-[26px] sm:text-[32px] uppercase tracking-[0.03em] text-[#F2EAE0] leading-none mt-1">
            Pasta de {deck.length} Evidências
          </h2>
        </div>

        <div className="font-mono-retro text-[12px] text-[#9A9590] bg-[#14151c] px-3 py-1.5 rounded-[8px] border border-[#262832]">
          {vistas.size} de {deck.length} evidências examinadas
        </div>
      </div>

      <div
        id="ev-grid"
        role="list"
        className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 sm:gap-4"
      >
        {deck.map((ev, i) => {
          const seen = vistas.has(ev.id);
          const isSel = examIdx === i;
          const seqIndex = sequence.indexOf(ev.id);
          const inSeq = seqIndex !== -1;
          const photo = PHOTOS[ev.id];
          const svgRaw = SVGS[ev.id];

          return (
            <button
              key={ev.id}
              type="button"
              onClick={() => onOpenExam(i)}
              style={{ animationDelay: `${i * 0.018}s` }}
              role="listitem"
              aria-label={`${ev.id} — ${ev.tipo}${seen ? ' (ouvida)' : ''}${inSeq ? ` · #${seqIndex + 1} na sequência` : ''}`}
              className={`rounded-[12px] overflow-hidden bg-[#13141a] border-2 shadow-[0_4px_16px_rgba(0,0,0,0.4)] cursor-pointer text-left p-0 font-inherit flex flex-col text-[#F2EAE0] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] ${
                isSel
                  ? 'border-[#7DD5D8] shadow-[0_0_14px_rgba(125,213,216,0.3)]'
                  : 'border-[#262833] hover:border-[#3d4253]'
              } ${seen ? 'opacity-70' : 'opacity-100'}`}
            >
              <div className="relative overflow-hidden bg-[#0c0d10] min-h-[90px]">
                {photo ? (
                  <img
                    src={photo}
                    alt={ev.tipo}
                    loading="lazy"
                    className="block w-full aspect-[300/185] object-cover"
                  />
                ) : svgRaw ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: svgRaw
                        .replace(/id="g(\w+)"/g, `id="g$1-${ev.id}"`)
                        .replace(/url\(#g(\w+)\)/g, `url(#g$1-${ev.id})`),
                    }}
                    className="block w-full h-auto"
                  />
                ) : (
                  <div className="h-[90px] flex items-center justify-center font-mono-retro text-[10px] text-[#303030]">
                    [ FOTO ]
                  </div>
                )}

                {/* Status Badge */}
                <span
                  className={`absolute top-[6px] right-[6px] z-[2] font-mono-retro text-[9px] tracking-[0.08em] px-[7px] py-[2px] rounded-[4px] uppercase font-bold shadow-sm ${
                    seen
                      ? 'bg-[#0D0D0D]/90 text-[#9A9590] border border-[#2b2e3a]'
                      : 'bg-[#D94040] text-white'
                  }`}
                  aria-hidden="true"
                >
                  {seen ? 'EXAMINADA' : 'NOVA'}
                </span>

                {/* Sequence Timeline Badge */}
                {inSeq && (
                  <span
                    className="absolute top-[6px] left-[6px] z-[2] font-mono-retro text-[9px] font-bold bg-[#7DD5D8] text-[#0D0D0D] px-[8px] py-[2px] rounded-[5px] shadow-sm tracking-[0.05em]"
                    aria-hidden="true"
                  >
                    #{String(seqIndex + 1).padStart(2, '0')}
                  </span>
                )}
              </div>

              {/* Card Label Tape */}
              <div className="p-3 bg-[#15171e] flex-1 flex flex-col justify-between border-t border-[#20222b]">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-mono-retro text-[11px] font-bold text-[#7DD5D8] tracking-[0.08em]">
                    FITA {ev.id}
                  </span>
                </div>
                <span className="font-mono-retro text-[12px] sm:text-[13px] font-semibold text-[#F2EAE0] leading-tight truncate">
                  {ev.tipo}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
