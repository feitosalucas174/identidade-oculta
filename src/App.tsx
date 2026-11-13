import React, { useState, useEffect, useRef } from 'react';
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
import { DetectiveBriefingModal } from './components/DetectiveBriefingModal';
import { DetectiveDefeatModal } from './components/DetectiveDefeatModal';
import { DetectiveVictoryModal } from './components/DetectiveVictoryModal';
import { RetroBootScreen } from './components/RetroBootScreen';
import { AudioSettingsProvider } from './contexts/AudioSettingsContext';
import { connectAudioElement, resumeAudioOutput } from './audio/audioBus';

const AppContent: React.FC = () => {
  // Game state
  const [isBooting, setIsBooting] = useState(true);
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
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isDefeatOpen, setIsDefeatOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [isRetroSheetOpen, setIsRetroSheetOpen] = useState(false);
  const [timelineAnimTrigger, setTimelineAnimTrigger] = useState(0);
  const [timelineAnimType, setTimelineAnimType] = useState<TimelineAnimationType>('vhs');

  // A trilha volta ao início antes do silêncio gravado no fim do WAV (23,26 s).
  // Isso mantém o loop contínuo sem precisar alterar o arquivo original.
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const gameOverAudioRef = useRef<HTMLAudioElement | null>(null);
  const victoryAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicLoopTimerRef = useRef<number | null>(null);
  const musicPausedForEvidenceRef = useRef(false);
  // Tracks playback intent independently from HTMLMediaElement.paused.
  // Safari can report transient media-state changes while its Web Audio graph resumes.
  const backgroundMusicShouldPlayRef = useRef(false);

  const stopGameOverAudio = () => {
    const audio = gameOverAudioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  const stopVictoryAudio = () => {
    const audio = victoryAudioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  const playVictoryAudio = () => {
    let audio = victoryAudioRef.current;
    if (!audio) {
      audio = new Audio(`${import.meta.env.BASE_URL}assets/aistudio/ganhou_jogo.wav`);
      audio.preload = 'auto';
      audio.loop = false;
      victoryAudioRef.current = audio;
    }

    audio.pause();
    audio.currentTime = 0;
    connectAudioElement(audio, 'music');
    void resumeAudioOutput();
    // Start immediately from the successful submit interaction for mobile browser compatibility.
    void audio.play().catch(() => {
      // Playback can still be denied by browser/device autoplay restrictions.
    });
  };

  const playGameOverAudio = () => {
    let audio = gameOverAudioRef.current;
    if (!audio) {
      audio = new Audio(`${import.meta.env.BASE_URL}assets/aistudio/game_over.wav`);
      audio.preload = 'auto';
      audio.loop = false;
      gameOverAudioRef.current = audio;
    }

    audio.pause();
    audio.currentTime = 0;
    connectAudioElement(audio, 'music');
    void resumeAudioOutput();
    // Called directly from the submit click so mobile browsers retain user activation.
    void audio.play().catch(() => {
      // Playback can still be denied by browser/device autoplay restrictions.
    });
  };

  const pauseBackgroundMusic = () => {
    const music = backgroundMusicRef.current;
    backgroundMusicShouldPlayRef.current = false;
    musicPausedForEvidenceRef.current = false;
    if (!music) return;
    music.pause();
    music.currentTime = 0;
  };

  const pauseMusicForEvidence = () => {
    const music = backgroundMusicRef.current;
    // Do not rely on Safari's transient .paused value; use the app's playback intent.
    if (!music || !backgroundMusicShouldPlayRef.current) return;
    musicPausedForEvidenceRef.current = true;
    music.pause();
  };

  const resumeMusicAfterEvidence = () => {
    const music = backgroundMusicRef.current;
    if (!musicPausedForEvidenceRef.current) return;
    musicPausedForEvidenceRef.current = false;

    if (!music || !backgroundMusicShouldPlayRef.current || isDefeatOpen || isVictoryOpen) return;
    void resumeAudioOutput();
    void music.play().catch(() => {
      // Keep the intent so the next explicit play action can retry.
    });
  };

  const startBackgroundMusic = () => {
    backgroundMusicShouldPlayRef.current = true;
    let music = backgroundMusicRef.current;
    if (!music) {
      music = new Audio(`${import.meta.env.BASE_URL}assets/aistudio/trilha_principal_10d9fdf3.wav`);
      music.loop = false;
      music.preload = 'auto';
      connectAudioElement(music, 'music');
      backgroundMusicRef.current = music;

      musicLoopTimerRef.current = window.setInterval(() => {
        if (!music || music.paused) return;
        if (music.currentTime >= 23.26) {
          music.currentTime = 0;
        }
      }, 50);
    }

    if (music.paused) {
      void resumeAudioOutput();
      void music.play().catch(() => {
        // Se o navegador bloquear a reprodução, a próxima interação pode tentar novamente.
      });
    }
  };

  useEffect(() => {
    // Preload os dois finais durante a investigação para evitar atraso no primeiro play,
    // especialmente no Safari, que pode iniciar WAVs grandes somente após baixar dados.
    if (!gameOverAudioRef.current) {
      const audio = new Audio(`${import.meta.env.BASE_URL}assets/aistudio/game_over.wav`);
      audio.preload = 'auto';
      audio.loop = false;
      audio.load();
      gameOverAudioRef.current = audio;
    }
    if (!victoryAudioRef.current) {
      const audio = new Audio(`${import.meta.env.BASE_URL}assets/aistudio/ganhou_jogo.wav`);
      audio.preload = 'auto';
      audio.loop = false;
      audio.load();
      victoryAudioRef.current = audio;
    }

    return () => {
      backgroundMusicShouldPlayRef.current = false;
      const music = backgroundMusicRef.current;
      if (music) {
        music.pause();
        music.currentTime = 0;
      }
      stopGameOverAudio();
      stopVictoryAudio();
      if (musicLoopTimerRef.current !== null) {
        window.clearInterval(musicLoopTimerRef.current);
        musicLoopTimerRef.current = null;
      }
      backgroundMusicRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isDefeatOpen || isVictoryOpen) {
      pauseBackgroundMusic();
    }
  }, [isDefeatOpen, isVictoryOpen]);

  const handleBootComplete = () => {
    startBackgroundMusic();
    setIsBooting(false);
  };

  // Counters
  const vistasCount = vistas.size;
  const unseenCount = EV.length - vistasCount;
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
    startBackgroundMusic();
    setIsHomeOpen(false);
    if (!hasProgress()) {
      setIsBriefingOpen(true);
    }
  };

  const handleFinishBriefing = () => {
    setIsBriefingOpen(false);
    setIsHomeOpen(false);
  };

  const handleGoHome = () => {
    startBackgroundMusic();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setExamIdx(null);
    setVerificationResult(null);
    setIsDefeatOpen(false);
    setIsVictoryOpen(false);
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

  const handleNavigateEvidence = (direction: -1 | 1) => {
    setExamIdx(current => {
      if (current === null) return current;
      const nextIdx = Math.max(0, Math.min(deck.length - 1, current + direction));
      const nextEvidence = deck[nextIdx];
      if (nextEvidence) {
        setVistas(prev => {
          const next = new Set(prev);
          next.add(nextEvidence.id);
          return next;
        });
      }
      return nextIdx;
    });
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
    if (pct >= 85) endingKey = 'total';
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

    // Show victory or defeat modal depending on result
    if (endingKey === 'total') {
      stopGameOverAudio();
      pauseBackgroundMusic();
      playVictoryAudio();
      setIsVictoryOpen(true);
      setIsDefeatOpen(false);
    } else {
      stopVictoryAudio();
      pauseBackgroundMusic();
      playGameOverAudio();
      setIsVictoryOpen(false);
      setIsDefeatOpen(true);
    }
  };

  const handleReviewFromDefeat = () => {
    stopGameOverAudio();
    setIsDefeatOpen(false);
    startBackgroundMusic();
  };

  const handleRestartFromDefeat = () => {
    setIsDefeatOpen(false);
    handleRestart();
  };

  const handleRestart = () => {
    stopGameOverAudio();
    stopVictoryAudio();
    startBackgroundMusic();
    setDeck(shuffle(EV));
    setVistas(new Set());
    setSequence([]);
    setExamIdx(null);
    setAnswers({});
    setFieldStatuses({});
    setVerificationResult(null);
    setIsDefeatOpen(false);
    setIsVictoryOpen(false);
    setActiveTab('fitas');
    setTimelineAnimTrigger(0);
    setIsBriefingOpen(true);
    setIsHomeOpen(false);
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

  if (isBooting) {
    return <RetroBootScreen onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2EAE0] font-sans selection:bg-[#7DD5D8] selection:text-[#0D0D0D]">
      {/* Home Screen Modal */}
      <HomeScreen
        isOpen={isHomeOpen}
        hasProgress={hasProgress()}
        onStart={handleStart}
        onRestart={handleRestart}
      />

      {/* Detective Briefing Modal on Game Start */}
      <DetectiveBriefingModal
        isOpen={isBriefingOpen}
        onClose={handleFinishBriefing}
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
            onNavigateEvidence={handleNavigateEvidence}
            onAddToSeq={handleAddToSeq}
            onMoveSeq={handleMoveSeq}
            onRemoveFromSeq={handleRemoveFromSeq}
            onAudioFocusChange={(active) => {
              if (active) pauseMusicForEvidence();
              else resumeMusicAfterEvidence();
            }}
            onOpenRetroSheet={() => setIsRetroSheetOpen(true)}
          />

          {/* Detective Defeat Modal on Failed Investigation */}
          <DetectiveDefeatModal
            isOpen={isDefeatOpen}
            onReview={handleReviewFromDefeat}
            onRestart={handleRestartFromDefeat}
          />

          {/* Detective Victory Modal on Solved Investigation */}
          <DetectiveVictoryModal
            isOpen={isVictoryOpen}
            onReview={() => {
              stopVictoryAudio();
              setIsVictoryOpen(false);
              startBackgroundMusic();
            }}
            onRestart={handleRestart}
          />

          {/* Result Modal */}
          <ResultModal
            result={verificationResult}
            isOpen={verificationResult !== null && !isDefeatOpen && !isVictoryOpen}
            onClose={() => {
              setVerificationResult(null);
              setActiveTab('fichas');
            }}
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

export const App: React.FC = () => (
  <AudioSettingsProvider>
    <AppContent />
  </AudioSettingsProvider>
);

export default App;
