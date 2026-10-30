import React, { useState, useEffect } from 'react';
import {
  AllAnswers,
  CharacterVerificationResult,
  FieldKey,
  FinalVerificationResult,
} from './types';
import {
  ENDINGS,
  EV,
  GAB,
  getOptionLabel,
  HINTS,
  match,
  MOCK_FICHAS,
  MOCK_FICHAS_WRONG,
  MOCK_SEQ,
  MOCK_SEQ_WRONG,
  PERS,
  shuffle,
} from './data/evidence';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { FitasTab } from './components/FitasTab';
import { SequenciaTab } from './components/SequenciaTab';
import { FichasTab } from './components/FichasTab';
import { ExamSheet } from './components/ExamSheet';
import { ResultModal } from './components/ResultModal';
import { RetroSheetModal } from './components/RetroSheetModal';
import { FlamingSkullEffect, TimelineAnimationType } from './components/FlamingSkullEffect';

export const App: React.FC = () => {
  // Game state
  const [deck, setDeck] = useState(() => shuffle(EV));
  const [vistas, setVistas] = useState<Set<string>>(() => new Set());
  const [sequence, setSequence] = useState<string[]>([]);
  const [examIdx, setExamIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('fitas');
  const [answers, setAnswers] = useState<AllAnswers>({});
  const [fieldStatuses, setFieldStatuses] = useState<
    Record<string, Record<FieldKey, 'ok' | 'err' | 'amb' | undefined>>
  >({});
  const [verificationResult, setVerificationResult] = useState<FinalVerificationResult | null>(null);
  const [isHomeOpen, setIsHomeOpen] = useState(true);
  const [isRetroSheetOpen, setIsRetroSheetOpen] = useState(false);
  const [timelineAnimTrigger, setTimelineAnimTrigger] = useState(0);
  const [timelineAnimType, setTimelineAnimType] = useState<TimelineAnimationType>('vhs');

  // Preload sprite assets and pre-warm GPU texture cache on mount for instant mobile performance
  useEffect(() => {
    const img1 = new Image();
    img1.src = '/assets/vhs_strip.png';
    const img2 = new Image();
    img2.src = '/assets/claquete_strip.png';
    const img3 = new Image();
    img3.src = '/assets/revolver_strip.png';
    const img4 = new Image();
    img4.src = '/assets/ampulheta_strip.png';
    const img5 = new Image();
    img5.src = '/assets/lupa_strip.png';
  }, []);

  // Counters
  const vistasCount = vistas.size;
  const unseenCount = 21 - vistasCount;
  let camposCount = 0;
  PERS.forEach(p => {
    const pAns = answers[p.id];
    if (pAns) {
      if (pAns.ordem) camposCount++;
      if (pAns.local) camposCount++;
      if (pAns.quando) camposCount++;
      if (pAns.como) camposCount++;
    }
  });

  const hasProgress = () => {
    if (vistas.size > 0 || sequence.length > 0) return true;
    return Object.values(answers).some(pAns =>
      Object.values(pAns).some(v => Boolean(v))
    );
  };

  const handleStart = () => {
    setIsHomeOpen(false);
  };

  const handleGoHome = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setExamIdx(null);
    setVerificationResult(null);
    setIsHomeOpen(true);
  };

  const handleOpenExam = (idx: number) => {
    setExamIdx(idx);
    const ev = deck[idx];
    if (ev) {
      setVistas(prev => {
        const next = new Set(prev);
        next.add(ev.id);
        return next;
      });
    }
  };

  const handleOpenByEvId = (evId: string) => {
    const idx = deck.findIndex(e => e.id === evId);
    if (idx !== -1) {
      handleOpenExam(idx);
    }
  };

  const handleCloseExam = () => {
    setExamIdx(null);
  };

  const handleAddToSeq = (evId: string) => {
    setSequence(prev => {
      if (prev.includes(evId)) return prev;
      const animCycle: TimelineAnimationType[] = ['vhs', 'claquete', 'revolver', 'ampulheta', 'lupa'];
      const nextType = animCycle[prev.length % animCycle.length];
      setTimelineAnimType(nextType);
      setTimelineAnimTrigger(t => t + 1);
      return [...prev, evId];
    });
  };

  const handleRemoveFromSeq = (evId: string) => {
    setSequence(prev => prev.filter(id => id !== evId));
  };

  const handleMoveSeq = (evId: string, dir: number) => {
    setSequence(prev => {
      const idx = prev.indexOf(evId);
      if (idx === -1) return prev;
      const targetIdx = idx + dir;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
      return next;
    });
  };

  const handleClearSeq = () => {
    setSequence([]);
  };

  const handleAnswerChange = (pid: string, field: FieldKey, val: string) => {
    setAnswers(prev => ({
      ...prev,
      [pid]: {
        ...(prev[pid] || {}),
        [field]: val,
      },
    }));
    setFieldStatuses(prev => ({
      ...prev,
      [pid]: {
        ...(prev[pid] || {}),
        [field]: undefined,
      },
    }));
  };

  const calculateSeqScore = () => {
    if (sequence.length === 0) return 0;
    let hits = 0;
    for (let i = 0; i < Math.min(sequence.length, MOCK_SEQ.length); i++) {
      if (sequence[i] === MOCK_SEQ[i]) hits++;
    }
    return hits / MOCK_SEQ.length;
  };

  const handleConclude = () => {
    let tot = 0;
    let cor = 0;
    const dets: CharacterVerificationResult[] = [];
    const newStatuses: Record<string, Record<FieldKey, 'ok' | 'err' | 'amb'>> = {};

    PERS.forEach(p => {
      const gab = GAB[p.id];
      newStatuses[p.id] = { ordem: 'err', local: 'err', quando: 'err', como: 'err' };

      const campos = (['ordem', 'local', 'quando', 'como'] as FieldKey[]).map(f => {
        const val = answers[p.id]?.[f] || '';
        let ok: boolean;
        let cls: 'ok' | 'err' | 'amb';

        if (gab.especial && f === 'ordem') {
          ok = true;
          cls = 'amb';
          tot++;
          cor++;
        } else {
          ok = match(val, gab[f] || []);
          cls = ok ? 'ok' : 'err';
          tot++;
          if (ok) cor++;
        }

        newStatuses[p.id][f] = cls;

        return {
          label: { ordem: 'Ordem', local: 'Local', quando: 'Horário', como: 'Causa' }[f],
          val: getOptionLabel(f, val),
          ok,
          cls,
          hint: HINTS[p.id]?.[f] || '',
        };
      });

      dets.push({ p, campos, especial: gab.especial });
    });

    setFieldStatuses(newStatuses);

    const pct = Math.round((cor / tot) * 100);
    const seqFraction = calculateSeqScore();
    const seqPct = Math.round(seqFraction * 100);
    const seqHits = Math.round(seqFraction * MOCK_SEQ.length);

    let endingKey: 'total' | 'fichas-ok' | 'seq-ok' | 'parcial' | 'inconclusivo';
    if (pct >= 90 && seqPct >= 65) endingKey = 'total';
    else if (pct >= 75 && seqPct < 50) endingKey = 'fichas-ok';
    else if (seqPct >= 65 && pct < 65) endingKey = 'seq-ok';
    else if (pct >= 50) endingKey = 'parcial';
    else endingKey = 'inconclusivo';

    const endingObj = ENDINGS[endingKey];
    const infoText = endingObj.info;

    setVerificationResult({
      scoreCor: cor,
      scoreTot: tot,
      pct,
      seqPct,
      seqHits,
      endingKey,
      stamp: endingObj.stamp,
      color: endingObj.color,
      info: infoText,
      details: dets,
    });
  };

  const handleRestart = () => {
    setDeck(shuffle(EV));
    setVistas(new Set());
    setSequence([]);
    setExamIdx(null);
    setAnswers({});
    setFieldStatuses({});
    setVerificationResult(null);
    setActiveTab('fitas');
    setTimelineAnimTrigger(0);
  };

  const handleMockSuccess = () => {
    setAnswers(MOCK_FICHAS);
    setSequence(MOCK_SEQ.filter(id => EV.some(e => e.id === id)));
  };

  const handleMockError = () => {
    setAnswers(MOCK_FICHAS_WRONG);
    setSequence(MOCK_SEQ_WRONG.filter(id => EV.some(e => e.id === id)));
  };

  const currentExamEv = examIdx !== null ? deck[examIdx] : null;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2EAE0] font-sans selection:bg-[#7DD5D8] selection:text-[#0D0D0D]">
      {/* Home Screen Modal */}
      <HomeScreen
        isOpen={isHomeOpen}
        hasProgress={hasProgress()}
        onStart={handleStart}
        onRestart={handleRestart}
      />

      {/* Main App Layout */}
      {!isHomeOpen && (
        <>
          <Header
            vistasCount={vistasCount}
            camposCount={camposCount}
            onGoHome={handleGoHome}
          />

          <main id="content" className="pb-[64px]">
            {activeTab === 'fitas' && (
              <FitasTab
                deck={deck}
                vistas={vistas}
                sequence={sequence}
                examIdx={examIdx}
                onOpenExam={handleOpenExam}
              />
            )}

            {activeTab === 'seq' && (
              <SequenciaTab
                sequence={sequence}
                currentExamEvId={currentExamEv?.id || null}
                onOpenByEvId={handleOpenByEvId}
                onMoveSeq={handleMoveSeq}
                onRemoveFromSeq={handleRemoveFromSeq}
                onClearSeq={handleClearSeq}
              />
            )}

            {activeTab === 'fichas' && (
              <FichasTab
                answers={answers}
                fieldStatuses={fieldStatuses}
                onAnswerChange={handleAnswerChange}
                onConclude={handleConclude}
              />
            )}
          </main>

          {/* Navigation */}
          <Navigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            unseenCount={unseenCount}
            sequenceCount={sequence.length}
            camposCount={camposCount}
          />

          {/* Bottom Sheet Exam */}
          <ExamSheet
            evidence={currentExamEv}
            sequence={sequence}
            isOpen={examIdx !== null}
            onClose={handleCloseExam}
            onAddToSeq={handleAddToSeq}
            onMoveSeq={handleMoveSeq}
            onRemoveFromSeq={handleRemoveFromSeq}
            onOpenRetroSheet={() => setIsRetroSheetOpen(true)}
          />

          {/* Result Modal */}
          <ResultModal
            result={verificationResult}
            isOpen={verificationResult !== null}
            onClose={() => setVerificationResult(null)}
            onRestart={handleRestart}
            onGoHome={handleGoHome}
          />

          {/* RetroSheet-95 Spreadsheet Modal */}
          <RetroSheetModal
            isOpen={isRetroSheetOpen}
            onClose={() => setIsRetroSheetOpen(false)}
          />

          {/* Alternating Timeline Addition Effect (1st Skull, 2nd VHS, etc.) */}
          <FlamingSkullEffect
            triggerSignal={timelineAnimTrigger}
            animationType={timelineAnimType}
          />

          {/* Hidden pre-warm container for mobile GPU texture cache */}
          <div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
            <div className="sprite-vhs" />
            <div className="sprite-claquete" />
            <div className="sprite-revolver" />
            <div className="sprite-ampulheta" />
            <div className="sprite-lupa" />
          </div>

          {/* Dev / Test Mock Buttons */}
          <aside className="fixed bottom-[calc(var(--nav-h)+10px)] right-[10px] z-[140] flex gap-[5px]">
            <button
              type="button"
              id="btn-mock"
              onClick={handleMockSuccess}
              title="Preencher com respostas e sequência corretas"
              className="bg-[#222222] border border-[#303030] text-[#9A9590] font-mono-retro text-[9px] px-[8px] py-[5px] cursor-pointer rounded-[4px] hover:border-[#9A9590] hover:text-[#F2EAE0] transition-all tracking-[0.06em]"
            >
              Mock ⚡
            </button>
            <button
              type="button"
              id="btn-mock-err"
              onClick={handleMockError}
              title="Preencher com respostas e sequência incorretas"
              className="bg-[#3A1010] border border-[#D94040] text-[#D94040] font-mono-retro text-[9px] px-[8px] py-[5px] cursor-pointer rounded-[4px] hover:border-[#ff6060] hover:text-[#ff8080] transition-all tracking-[0.06em]"
            >
              Erro ✗
            </button>
          </aside>
        </>
      )}
    </div>
  );
};

export default App;
