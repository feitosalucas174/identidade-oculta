import React from 'react';
import { EV, PHOTOS, SVGS } from '../data/evidence';

interface SequenciaTabProps {
  sequence: string[];
  currentExamEvId: string | null;
  onOpenByEvId: (evId: string) => void;
  onMoveSeq: (evId: string, dir: number) => void;
  onRemoveFromSeq: (evId: string) => void;
  onClearSeq: () => void;
}

export const SequenciaTab: React.FC<SequenciaTabProps> = ({
  sequence,
  currentExamEvId,
  onOpenByEvId,
  onMoveSeq,
  onRemoveFromSeq,
  onClearSeq,
}) => {
  return (
    <div id="tab-seq" className="p-[16px_12px] sm:p-[20px_16px]">
      <div className="flex items-end justify-between gap-[10px] mb-[18px]">
        <div>
          <h2 className="font-brunson text-[30px] sm:text-[36px] uppercase tracking-[0.04em] leading-[0.9] text-[#F2EAE0] mb-1">
            Linha do Tempo
          </h2>
          <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#9A9590]">
            {sequence.length} de 21 fitas colocadas
          </p>
        </div>
        <button
          type="button"
          onClick={onClearSeq}
          disabled={sequence.length === 0}
          aria-label="Limpar sequência"
          className="h-[30px] sm:h-[32px] px-2.5 sm:px-3 rounded-[7px] bg-transparent border border-[#303030] text-[#9A9590] font-mono-retro text-[10px] sm:text-[11px] tracking-[0.08em] uppercase cursor-pointer hover:border-[#E57373] hover:text-[#E57373] disabled:opacity-25 disabled:cursor-default disabled:pointer-events-none transition-colors"
        >
          Limpar tudo
        </button>
      </div>

      {sequence.length === 0 ? (
        <div className="bg-[#181818] border border-dashed border-[#303030] rounded-[12px] p-[28px_16px] sm:p-[32px_24px] text-center font-mono-retro text-[12px] sm:text-[13px] text-[#9A9590] leading-[1.8]">
          Nenhuma fita colocada ainda.<br /><br />
          Abra uma evidência na aba <strong className="text-[#F2EAE0]">Fitas</strong> e toque em <strong className="text-[#F2EAE0]">+ Adicionar à sequência</strong>.
        </div>
      ) : (
        <div className="flex flex-col gap-[6px] sm:gap-[8px]">
          {sequence.map((evId, i) => {
            const ev = EV.find(e => e.id === evId);
            const isCur = evId === currentExamEvId;
            const photo = PHOTOS[evId];
            const svgRaw = SVGS[evId];

            return (
              <div
                key={evId}
                className={`flex items-center gap-2 sm:gap-3 bg-[#181818] border rounded-[10px] overflow-hidden transition-colors ${
                  isCur ? 'border-[#7DD5D8]' : 'border-[#303030]'
                }`}
              >
                <div className="w-[30px] sm:w-[38px] flex-shrink-0 text-center font-mono-retro text-[12px] sm:text-[13px] font-bold text-[#7DD5D8]">
                  #{i + 1}
                </div>

                <div
                  onClick={() => onOpenByEvId(evId)}
                  title="Examinar"
                  className="w-[52px] sm:w-[66px] h-[39px] sm:h-[50px] flex-shrink-0 relative overflow-hidden bg-[#0D0D0D] cursor-pointer"
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt={ev?.tipo || ''}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : svgRaw ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: svgRaw
                          .replace(/id="g(\w+)"/g, `id="g$1-${evId}-seq"`)
                          .replace(/url\(#g(\w+)\)/g, `url(#g$1-${evId}-seq)`),
                      }}
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : null}
                </div>

                <div
                  onClick={() => onOpenByEvId(evId)}
                  className="flex-1 min-w-0 cursor-pointer py-[8px] sm:py-[10px]"
                >
                  <div className="font-mono-retro text-[10px] sm:text-[11px] text-[#9A9590]">
                    {evId}
                  </div>
                  <div className="text-[13px] sm:text-[15px] font-semibold text-[#F2EAE0] whitespace-nowrap overflow-hidden text-ellipsis">
                    {ev?.tipo || '—'}
                  </div>
                </div>

                <div className="flex items-center gap-[3px] pr-2 sm:px-2 flex-shrink-0">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => onMoveSeq(evId, -1)}
                    aria-label="Mover para cima"
                    className="w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] rounded-[6px] bg-transparent border border-[#222222] text-[#9A9590] text-[13px] sm:text-[15px] flex items-center justify-center hover:border-[#9A9590] hover:text-[#F2EAE0] disabled:opacity-20 disabled:cursor-default transition-all"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={i === sequence.length - 1}
                    onClick={() => onMoveSeq(evId, 1)}
                    aria-label="Mover para baixo"
                    className="w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] rounded-[6px] bg-transparent border border-[#222222] text-[#9A9590] text-[13px] sm:text-[15px] flex items-center justify-center hover:border-[#9A9590] hover:text-[#F2EAE0] disabled:opacity-20 disabled:cursor-default transition-all"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveFromSeq(evId)}
                    aria-label="Remover"
                    className="w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] rounded-[6px] bg-transparent border border-[#222222] text-[#9A9590] text-[13px] sm:text-[15px] flex items-center justify-center hover:border-[#E57373] hover:text-[#E57373] transition-all"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
