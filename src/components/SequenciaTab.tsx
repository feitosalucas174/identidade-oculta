import React from 'react';
import { EV, PHOTOS, SVGS } from '../data/evidence';
import { Disc, ChevronUp, ChevronDown, Trash2, Film, RotateCcw } from 'lucide-react';

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
  const totalTapes = EV.length;
  const progressPct = Math.round((sequence.length / totalTapes) * 100);

  return (
    <div id="tab-seq" className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* VCR Deck Control Header */}
      <div className="bg-[#121318] border-2 border-[#262833] rounded-[14px] p-4 sm:p-5 mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="font-mono-retro text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#7DD5D8] font-bold flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-[#7DD5D8]" />
              <span>DECK VCR-1995 · FITA MAGNÉTICA CRONOLÓGICA</span>
            </div>
            <h2 className="font-brunson text-[28px] sm:text-[34px] uppercase tracking-[0.03em] leading-none text-[#F2EAE0] mt-1">
              Linha do Tempo
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Digital Tape Counter */}
            <div className="flex items-center gap-2 bg-[#0a0b0e] border border-[#232630] px-3 py-1.5 rounded-[8px]">
              <div className="w-2 h-2 rounded-full bg-[#7DD5D8] animate-pulse" />
              <span className="font-mono-retro text-[12px] sm:text-[13px] text-[#7DD5D8] font-bold tracking-[0.06em]">
                {String(sequence.length).padStart(2, '0')} / {totalTapes} FITAS
              </span>
            </div>

            {/* Clear All Tapes Button */}
            <button
              type="button"
              onClick={onClearSeq}
              disabled={sequence.length === 0}
              aria-label="Ejetar todas as fitas"
              className="h-[36px] px-3 rounded-[8px] bg-[#1a1b22] border border-[#343846] text-[#9A9590] hover:text-[#E57373] hover:border-[#E57373] font-mono-retro text-[11px] uppercase tracking-[0.08em] font-semibold cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ejetar Todas</span>
            </button>
          </div>
        </div>

        {/* Tape Progress Meter */}
        <div className="w-full bg-[#0a0b0e] h-2 rounded-full overflow-hidden border border-[#20222a] relative">
          <div
            className="h-full bg-gradient-to-r from-[#5aa0a3] to-[#7DD5D8] transition-all duration-300 shadow-[0_0_8px_rgba(125,213,216,0.5)]"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Empty State: Empty Cassette Rack */}
      {sequence.length === 0 ? (
        <div className="bg-[#121318] border-2 border-dashed border-[#2b2e3b] rounded-[16px] p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-3 shadow-inner">
          <div className="w-16 h-16 rounded-full bg-[#1b1c24] border border-[#313545] flex items-center justify-center mb-1">
            <Disc className="w-8 h-8 text-[#5c6173]" />
          </div>
          <h3 className="font-brunson text-[24px] sm:text-[28px] uppercase tracking-[0.03em] text-[#F2EAE0]">
            Nenhuma Fita Carregada no Deck
          </h3>
          <p className="font-mono-retro text-[13px] sm:text-[14px] text-[#9A9590] max-w-[480px] leading-[1.8]">
            Abra qualquer evidência na aba <strong className="text-[#7DD5D8]">Fitas</strong> e clique em <strong className="text-[#F2EAE0]">+ Adicionar à sequência</strong> para construir a ordem cronológica dos fatos do Rancho Esperança.
          </p>
        </div>
      ) : (
        /* VHS Cassette Tape Spines Rack */
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {sequence.map((evId, i) => {
            const ev = EV.find(e => e.id === evId);
            const isCur = evId === currentExamEvId;
            const photo = PHOTOS[evId];
            const svgRaw = SVGS[evId];

            return (
              <div
                key={evId}
                className={`relative flex items-center gap-2 sm:gap-3.5 bg-[#13141b] border-2 rounded-[12px] p-2 sm:p-2.5 transition-all duration-150 ${
                  isCur
                    ? 'border-[#7DD5D8] shadow-[0_0_16px_rgba(125,213,216,0.25)] bg-[#171922]'
                    : 'border-[#272a36] hover:border-[#3b4052]'
                }`}
              >
                {/* Digital LED Position Tag */}
                <div className="w-[42px] sm:w-[50px] h-[44px] sm:h-[50px] flex-shrink-0 flex items-center justify-center bg-[#090a0d] border border-[#20222a] rounded-[8px]">
                  <span className="font-mono-retro text-[14px] sm:text-[16px] font-bold text-[#7DD5D8] tracking-[0.05em]">
                    #{String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Evidence Thumbnail with Cassette Window */}
                <div
                  onClick={() => onOpenByEvId(evId)}
                  title="Examinar fita pericial"
                  className="w-[58px] sm:w-[76px] h-[44px] sm:h-[50px] flex-shrink-0 relative overflow-hidden bg-[#0a0a0c] rounded-[7px] border border-[#242732] cursor-pointer group"
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt={ev?.tipo || ''}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
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

                  {/* Tape Spool Overlay Icon */}
                  <div className="absolute bottom-1 right-1 bg-black/75 px-1 py-0.5 rounded text-[9px] text-[#7DD5D8] font-mono-retro font-bold">
                    {evId}
                  </div>
                </div>

                {/* Tape Label Section (Clean, legible on mobile without tiny repetitive text) */}
                <div
                  onClick={() => onOpenByEvId(evId)}
                  className="flex-1 min-w-0 cursor-pointer flex flex-col justify-center px-1"
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono-retro text-[12px] sm:text-[13px] font-bold text-[#7DD5D8] bg-[#0c0d12] px-2 py-0.5 rounded border border-[#232734]">
                      {evId}
                    </span>
                    <span className="font-mono-retro text-[13px] sm:text-[14px] font-bold text-[#F2EAE0] truncate">
                      {ev?.tipo || 'Evidência'}
                    </span>
                  </div>
                </div>

                {/* VCR Deck Transport Controls (Up, Down, Eject) */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 pr-1">
                  {/* Move Up Button */}
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => onMoveSeq(evId, -1)}
                    title="Mover fita para cima"
                    aria-label={`Mover fita ${evId} para cima`}
                    className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] rounded-[7px] bg-[#1a1b24] border border-[#2d3140] text-[#9A9590] hover:text-[#7DD5D8] hover:border-[#7DD5D8] disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>

                  {/* Move Down Button */}
                  <button
                    type="button"
                    disabled={i === sequence.length - 1}
                    onClick={() => onMoveSeq(evId, 1)}
                    title="Mover fita para baixo"
                    aria-label={`Mover fita ${evId} para baixo`}
                    className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] rounded-[7px] bg-[#1a1b24] border border-[#2d3140] text-[#9A9590] hover:text-[#7DD5D8] hover:border-[#7DD5D8] disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Eject / Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemoveFromSeq(evId)}
                    title="Ejetar fita da linha do tempo"
                    aria-label={`Remover fita ${evId}`}
                    className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] rounded-[7px] bg-[#1f1618] border border-[#3d2426] text-[#E57373] hover:bg-[#2c1719] hover:border-[#E57373] transition-all flex items-center justify-center cursor-pointer ml-0.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
