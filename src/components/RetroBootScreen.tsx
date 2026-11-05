import React, { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle2, ChevronRight, FolderOpen, Search, Smartphone, Tablet, Monitor } from 'lucide-react';
import { EV } from '../data/evidence';

type AudioPlatform = 'mobile' | 'tablet' | 'desktop';

function detectAudioPlatform(): AudioPlatform {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent || '';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua))) return 'tablet';
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return 'tablet';
  if (/Android|iPhone|iPod|Mobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

interface RetroBootScreenProps {
  onComplete: () => void;
}

export const RetroBootScreen: React.FC<RetroBootScreenProps> = ({ onComplete }) => {
  const BASE_URL = import.meta.env.BASE_URL;
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    'POLÍCIA CIVIL SP · DELEGACIA DE HOMICÍDIOS E INVESTIGAÇÕES GERAIS (1995)',
    'ABRINDO INQUÉRITO POLICIAL 042/95 · RANCHO ESPERANÇA...',
  ]);
  const [isReady, setIsReady] = useState(false);
  const [audioPlatform, setAudioPlatform] = useState<AudioPlatform>(() => {
    try {
      const saved = window.localStorage.getItem('identidade-oculta-audio-platform');
      if (saved === 'mobile' || saved === 'tablet' || saved === 'desktop') return saved;
    } catch { /* storage may be unavailable */ }
    return detectAudioPlatform();
  });

  const selectAudioPlatform = (platform: AudioPlatform) => {
    setAudioPlatform(platform);
    try { window.localStorage.setItem('identidade-oculta-audio-platform', platform); } catch { /* storage may be unavailable */ }
  };
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    const assetsToLoad: string[] = [
      ...Array.from({ length: 16 }, (_, i) => `${BASE_URL}assets/detetive/frame_${String(i).padStart(2, '0')}.png`),
      ...Array.from({ length: 8 }, (_, i) => `${BASE_URL}assets/detetive_derrota/frame_${String(i).padStart(2, '0')}.png`),
      `${BASE_URL}assets/aistudio/Detetive_Pixelado_no_Ref_gio_Aconchegante_674d8c38.png`,
      `${BASE_URL}assets/vhs_strip.png`,
      `${BASE_URL}assets/claquete_strip.png`,
      `${BASE_URL}assets/revolver_strip.png`,
      `${BASE_URL}assets/ampulheta_strip.png`,
      `${BASE_URL}assets/lupa_strip.png`,
      `${BASE_URL}assets/aistudio/AG_FC_44a91d2b.jpg`,
      `${BASE_URL}assets/aistudio/1_994dbf90.jpg`,
      `${BASE_URL}assets/aistudio/2_d8fcfc06.jpg`,
      `${BASE_URL}assets/aistudio/3_259d20ba.jpg`,
      `${BASE_URL}assets/aistudio/4_88dd4e00.jpg`,
      `${BASE_URL}assets/aistudio/5_666b334d.jpg`,
      `${BASE_URL}assets/aistudio/6_5c870541.jpg`,
      `${BASE_URL}assets/aistudio/7_aa3e89d6.jpg`,
      `${BASE_URL}assets/aistudio/8_6ce7ced0.jpg`,
      `${BASE_URL}assets/aistudio/9_467f2335.jpg`,
      `${BASE_URL}assets/aistudio/10_df7bff44.jpg`,
      `${BASE_URL}Tratadas/MARCOS 3.jpg`,
      `${BASE_URL}Tratadas/MONICA 3.jpg`,
    ];

    let loadedCount = 0;
    const totalAssets = assetsToLoad.length + 1;

    const updateProgress = (itemName: string) => {
      loadedCount++;
      const currentPct = Math.min(100, Math.floor((loadedCount / totalAssets) * 100));
      setProgress(currentPct);

      if (currentPct >= 20 && currentPct < 45) {
        setLogs((prev) =>
          prev.includes('[OK] LAUDO GRAFOTÉCNICO E DOCUMENTOS DATILOGRAFADOS REUNIDOS')
            ? prev
            : [...prev, '[OK] LAUDO GRAFOTÉCNICO E DOCUMENTOS DATILOGRAFADOS REUNIDOS']
        );
      } else if (currentPct >= 45 && currentPct < 75) {
        setLogs((prev) =>
          prev.includes('[OK] DOSSIÊ DE SUSPEITOS E DEPOIMENTOS DA EQUIPE REUNIDOS')
            ? prev
            : [...prev, '[OK] DOSSIÊ DE SUSPEITOS E DEPOIMENTOS DA EQUIPE REUNIDOS']
        );
      } else if (currentPct >= 75 && currentPct < 95) {
        setLogs((prev) =>
          prev.includes('[OK] REGISTROS VISUAIS DA CENA E PERFIL DO INVESTIGADOR PREPARADOS')
            ? prev
            : [...prev, '[OK] REGISTROS VISUAIS DA CENA E PERFIL DO INVESTIGADOR PREPARADOS']
        );
      } else if (currentPct >= 95) {
        setLogs((prev) =>
          prev.includes(`[OK] INQUÉRITO COMPLETO · ${EV.length} FICHAS PRONTAS PARA ANÁLISE`)
            ? prev
            : [...prev, `[OK] INQUÉRITO COMPLETO · ${EV.length} FICHAS PRONTAS PARA ANÁLISE`]
        );
      }
    };

    const loadFont = async () => {
      try {
        if (typeof document !== 'undefined' && document.fonts) {
          await document.fonts.load('1em "Brunson Rough"');
          await document.fonts.ready;
        }
      } catch (err) {
        console.warn('Font preload check bypassed', err);
      } finally {
        updateProgress('Brunson Font');
      }
    };

    loadFont();

    assetsToLoad.forEach((src) => {
      const img = new Image();
      img.onload = () => updateProgress(src);
      img.onerror = () => updateProgress(src);
      img.src = src;
    });

    const timeout = setTimeout(() => {
      setProgress(100);
      setIsReady(true);
    }, 4500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !isReady) {
      setIsReady(true);
      const timer = setTimeout(() => {
        handleProceed();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, isReady]);

  const handleProceed = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    onComplete();
  };

  const totalBlocks = 24;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const emptyBlocks = Math.max(0, totalBlocks - filledBlocks);
  const barString = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#07080a] text-[#F2EAE0] flex flex-col items-center justify-center p-4 select-none font-mono-retro">
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 2px',
        }}
      />

      <div className="relative w-full max-w-[620px] bg-[#0c0e12] border-2 border-[#262830] rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col">
        <div className="bg-[#14161d] border-b border-[#242730] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#7DD5D8]" />
            <span className="text-[11px] sm:text-[12px] font-bold text-[#7DD5D8] tracking-[0.14em]">
              SSP-SP · POLÍCIA CIVIL DE SÃO PAULO (1995)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#9A9590]">
            <FolderOpen className="w-3.5 h-3.5 text-[#E6C687]" />
            <span className="text-[#E6C687]">PASTA DO INQUÉRITO 1/1</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-4 text-xs sm:text-[13px] leading-relaxed">
          <div className="border-b border-[#1c1e26] pb-3 text-[#9A9590] flex flex-col gap-0.5">
            <div className="text-[#F2EAE0] font-bold tracking-wider">
              INQUÉRITO POLICIAL #1995-1013 · CASO ALICE GUY [RANCHO ESPERANÇA]
            </div>
            <div className="text-[11px] text-[#7DD5D8]/80">
              DOSSIÊ CONFIDENCIAL: RECONSTITUIÇÃO DOS FATOS, FITAS E SUSPEITOS
            </div>
          </div>

          <div className="bg-[#050608] border border-[#1b1c24] rounded-lg p-3 min-h-[140px] max-h-[160px] overflow-hidden flex flex-col justify-end text-[11px] sm:text-[12px] text-[#A6A29A]">
            {logs.slice(-5).map((log, index) => (
              <div
                key={index}
                className={`py-0.5 flex items-center gap-1.5 ${
                  log.startsWith('[OK]') ? 'text-[#4CAF50] font-bold' : 'text-[#7DD5D8]'
                }`}
              >
                {log.startsWith('[OK]') ? (
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-[#4CAF50]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-[#7DD5D8]" />
                )}
                <span className="truncate">{log}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-[#7DD5D8] pt-1">
              <span>&gt; ORGANIZANDO ARQUIVOS DA INVESTIGAÇÃO...</span>
              <span className="inline-block w-2 h-3.5 bg-[#7DD5D8] animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between text-[11px] text-[#9A9590]">
              <span className="tracking-wider uppercase">PREPARAÇÃO DO DOSSIÊ DO CASO:</span>
              <span className="font-bold text-[#7DD5D8]">{progress}%</span>
            </div>

            <div className="bg-[#050608] border border-[#262830] rounded-lg p-2.5 text-center font-mono text-sm tracking-[2px] text-[#7DD5D8] select-none overflow-x-hidden">
              [{barString}]
            </div>
          </div>

          <div className="rounded-lg border border-[#262830] bg-[#090b0f] p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9A9590]">Perfil de áudio</span>
              <span className="text-[9px] text-[#7DD5D8]">{EV.length} FICHAS NO DOSSIÊ</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={() => selectAudioPlatform('mobile')} aria-pressed={audioPlatform === 'mobile'} className={`min-h-[38px] rounded border px-2 flex items-center justify-center gap-1.5 text-[10px] uppercase transition-colors ${audioPlatform === 'mobile' ? 'border-[#7DD5D8] bg-[#173033] text-[#7DD5D8]' : 'border-[#30343d] bg-[#17191e] text-[#9A9590]'}`}><Smartphone className="w-3.5 h-3.5" /> Celular</button>
              <button type="button" onClick={() => selectAudioPlatform('tablet')} aria-pressed={audioPlatform === 'tablet'} className={`min-h-[38px] rounded border px-2 flex items-center justify-center gap-1.5 text-[10px] uppercase transition-colors ${audioPlatform === 'tablet' ? 'border-[#7DD5D8] bg-[#173033] text-[#7DD5D8]' : 'border-[#30343d] bg-[#17191e] text-[#9A9590]'}`}><Tablet className="w-3.5 h-3.5" /> Tablet</button>
              <button type="button" onClick={() => selectAudioPlatform('desktop')} aria-pressed={audioPlatform === 'desktop'} className={`min-h-[38px] rounded border px-2 flex items-center justify-center gap-1.5 text-[10px] uppercase transition-colors ${audioPlatform === 'desktop' ? 'border-[#7DD5D8] bg-[#173033] text-[#7DD5D8]' : 'border-[#30343d] bg-[#17191e] text-[#9A9590]'}`}><Monitor className="w-3.5 h-3.5" /> Computador</button>
            </div>
            <p className="text-[9px] leading-relaxed text-[#777d89]">Ajuste salvo neste navegador e aplicado aos áudios das fichas.</p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleProceed}
              className={`px-4 py-2 rounded border text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
                isReady
                  ? 'bg-[#7DD5D8] text-black border-[#7DD5D8] shadow-[0_0_15px_rgba(125,213,216,0.4)] animate-pulse cursor-pointer'
                  : 'bg-[#15171e] text-[#6b7280] border-[#22242c] hover:text-[#9A9590] cursor-pointer'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isReady ? 'INICIAR INVESTIGAÇÃO' : 'ACESSAR INQUÉRITO'}</span>
              <span className="font-mono text-[10px] opacity-75">[ENTER ↵]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
