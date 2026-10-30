import React from 'react';
import { Evidence } from '../types';
import { PHOTOS, SVGS } from '../data/evidence';

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
    <div id="tab-fitas" className="p-[16px_12px] sm:p-[20px_16px]">
      <div className="font-mono-retro text-[11px] tracking-[0.22em] uppercase text-[#9A9590] mb-[16px] flex items-center gap-[10px] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#303030]">
        Pasta de evidências — 21 fitas
      </div>

      <div
        id="ev-grid"
        role="list"
        className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2 sm:gap-3"
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
              className={`rounded-[10px] overflow-hidden bg-[#222222] border-2 shadow-[0_2px_8px_rgba(0,0,0,0.4)] cursor-pointer text-left p-0 font-inherit flex flex-col text-[#F2EAE0] transition-all duration-150 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] focus-visible:outline-offset-2 ${
                isSel ? 'border-[#7DD5D8] ring-1 ring-[#7DD5D8]' : 'border-transparent'
              } ${seen ? 'opacity-60' : 'opacity-100'}`}
            >
              <div className="relative overflow-hidden bg-[#181818] min-h-[85px]">
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
                  <div className="h-[85px] flex items-center justify-center font-mono-retro text-[10px] text-[#303030]">
                    [ FOTO ]
                  </div>
                )}

                {/* Status Badge */}
                <span
                  className={`absolute top-[6px] right-[6px] z-[2] font-mono-retro text-[9px] tracking-[0.05em] px-[6px] py-[2px] rounded-[3px] ${
                    seen
                      ? 'bg-[#0D0D0D]/85 text-[#9A9590] border border-[#303030]'
                      : 'bg-[#D94040] text-white font-bold'
                  }`}
                  aria-hidden="true"
                >
                  {seen ? 'VISTA' : 'NOVA'}
                </span>

                {/* Sequence Badge */}
                {inSeq && (
                  <span
                    className="absolute top-[6px] left-[6px] z-[2] font-mono-retro text-[9px] font-bold bg-[#7DD5D8] text-[#0D0D0D] px-[7px] py-[2px] rounded-[8px]"
                    aria-hidden="true"
                  >
                    #{seqIndex + 1}
                  </span>
                )}
              </div>

              <div className="p-[10px_12px_12px] bg-[#222222] flex-1 flex flex-col gap-[3px]">
                <span className="font-mono-retro text-[11px] text-[#9A9590] tracking-[0.06em]">
                  {ev.id}
                </span>
                <span className="text-[14px] font-semibold text-[#F2EAE0] leading-[1.3] truncate">
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
