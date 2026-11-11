import React, { useEffect, useRef, useState } from 'react';

interface HomeScreenProps {
  isOpen: boolean;
  hasProgress?: boolean;
  onStart: () => void;
  onRestart?: () => void;
}

const BASE_URL = import.meta.env.BASE_URL;

const CREW = [
  {
    nome: 'Juliana Naka',
    cargo: 'Diretora',
    foto: `${BASE_URL}assets/aistudio/1_994dbf90.jpg`,
  },
  {
    nome: 'Karen Ialago',
    cargo: 'Assistente de Direção',
    foto: `${BASE_URL}assets/aistudio/2_d8fcfc06.jpg`,
  },
  {
    nome: 'Davi Vieira',
    cargo: 'Produtor e Roteirista',
    foto: `${BASE_URL}assets/aistudio/3_259d20ba.jpg`,
  },
  {
    nome: 'Lucas Feitosa',
    cargo: 'Diretor de Elenco e Roteirista',
    foto: `${BASE_URL}assets/aistudio/4_88dd4e00.jpg`,
  },
  {
    nome: 'Lucas Batista',
    cargo: 'Diretor de Fotografia e Roteirista',
    foto: `${BASE_URL}assets/aistudio/5_666b334d.jpg`,
  },
  {
    nome: 'Vinícius Oliveira',
    cargo: 'Cinegrafista',
    foto: `${BASE_URL}assets/aistudio/6_5c870541.jpg`,
  },
  {
    nome: 'Pietra Notarberardino',
    cargo: 'Diretora de Arte',
    foto: `${BASE_URL}assets/aistudio/7_aa3e89d6.jpg`,
  },
  {
    nome: 'Izzy Donatella',
    cargo: 'Maquiadora e Figurinista',
    foto: `${BASE_URL}assets/aistudio/8_6ce7ced0.jpg`,
  },
  {
    nome: 'Gabriel Elias',
    cargo: 'Editor',
    foto: `${BASE_URL}assets/aistudio/9_467f2335.jpg`,
  },
  {
    nome: 'Marcello Araújo',
    cargo: 'Sonoplasta',
    foto: `${BASE_URL}assets/aistudio/10_df7bff44.jpg`,
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  isOpen,
  hasProgress = false,
  onStart,
  onRestart,
}) => {
  const [homeTab, setHomeTab] = useState<'intro' | 'how' | 'alice'>('intro');
  const [julianaOpen, setJulianaOpen] = useState(false);
  const [julianaFrame, setJulianaFrame] = useState(0);
  const [julianaReady, setJulianaReady] = useState(false);
  const julianaCanvasRef = useRef<HTMLCanvasElement>(null);
  const julianaSheetRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!julianaOpen) return;
    setJulianaFrame(0);
    setJulianaReady(false);
    const image = new Image();
    image.src = BASE_URL + 'assets/aistudio/image_28eba799.png';
    image.onload = () => {
      const sheet = document.createElement('canvas');
      sheet.width = image.naturalWidth;
      sheet.height = image.naturalHeight;
      const ctx = sheet.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(image, 0, 0);
      const pixels = ctx.getImageData(0, 0, sheet.width, sheet.height);
      const data = pixels.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 242 && data[i + 1] > 242 && data[i + 2] > 242) data[i + 3] = 0;
      }
      ctx.putImageData(pixels, 0, 0);
      julianaSheetRef.current = sheet;
      setJulianaReady(true);
    };
    image.onerror = () => { julianaSheetRef.current = null; };
    return () => { image.onload = null; image.onerror = null; };
  }, [julianaOpen]);

  useEffect(() => {
    if (!julianaOpen) return;
    const timer = window.setInterval(() => setJulianaFrame((frame) => (frame + 1) % 8), 220);
    return () => window.clearInterval(timer);
  }, [julianaOpen]);

  useEffect(() => {
    const sheet = julianaSheetRef.current;
    const canvas = julianaCanvasRef.current;
    if (!julianaOpen || !julianaReady || !sheet || !canvas) return;
    const frameW = sheet.width / 4;
    const frameH = sheet.height / 2;
    const col = julianaFrame % 4;
    const row = Math.floor(julianaFrame / 4);
    canvas.width = frameW;
    canvas.height = frameH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, frameW, frameH);
    ctx.drawImage(sheet, col * frameW, row * frameH, frameW, frameH, 0, 0, frameW, frameH);
  }, [julianaOpen, julianaReady, julianaFrame]);

  if (!isOpen) return null;

  return (
    <div
      id="home"
      className="fixed inset-0 z-[1000] bg-[#0D0D0D] overflow-y-auto px-4 py-6 sm:py-10 text-center transition-all duration-300 flex flex-col items-center justify-start"
    >
      <div className="w-full max-w-[500px] mx-auto my-auto flex flex-col items-center py-4">
        {/* Tabs */}
        <div className="flex mb-6 border border-[#2b2b36] rounded-[10px] overflow-hidden w-full max-w-[360px] bg-[#0c0c0f] shadow-inner">
          <button
            type="button"
            onClick={() => setHomeTab('intro')}
            className={`flex-1 h-[40px] bg-transparent border-none font-mono-retro text-[10px] sm:text-[11px] tracking-[0.08em] sm:tracking-[0.12em] uppercase cursor-pointer transition-colors ${
              homeTab === 'intro' ? 'bg-[#1e1e24] text-[#F2EAE0] font-bold' : 'text-[#8a8a98] hover:text-[#F2EAE0]'
            }`}
          >
            Início
          </button>
          <button
            type="button"
            onClick={() => setHomeTab('how')}
            className={`flex-1 h-[40px] bg-transparent border-none font-mono-retro text-[10px] sm:text-[11px] tracking-[0.08em] sm:tracking-[0.12em] uppercase cursor-pointer transition-colors ${
              homeTab === 'how' ? 'bg-[#1e1e24] text-[#D4AF37] font-bold border-b-2 border-b-[#D4AF37]' : 'text-[#8a8a98] hover:text-[#F2EAE0]'
            }`}
          >
            Como Jogar
          </button>
          <button
            type="button"
            onClick={() => setHomeTab('alice')}
            className={`flex-1 h-[40px] bg-transparent border-none font-mono-retro text-[10px] sm:text-[11px] tracking-[0.08em] sm:tracking-[0.12em] uppercase cursor-pointer transition-colors ${
              homeTab === 'alice' ? 'bg-[#1e1e24] text-[#D4AF37] font-bold border-b-2 border-b-[#D4AF37]' : 'text-[#8a8a98] hover:text-[#F2EAE0]'
            }`}
          >
            Alice Guy 📽
          </button>
        </div>

        {/* Intro tab */}
        {homeTab === 'intro' && (
          <div className="flex flex-col items-center w-full max-w-[420px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161112] border border-[#3A1515] mb-4 shadow-sm">
              <span className="rec-dot" aria-hidden="true" />
              <span className="font-mono-retro text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#D94040] font-bold">
                Caso nº 139 · Rancho Esperança · 1995
              </span>
            </div>
            <h1 className="font-brunson text-[clamp(48px,12.5vw,82px)] uppercase tracking-[0.04em] leading-[0.9] text-[#F2EAE0] mb-[6px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Identidade<br />Oculta
            </h1>
            <div className="font-mono-retro text-[13px] sm:text-[15px] tracking-[0.22em] uppercase text-[#D4AF37] font-bold mb-5 flex items-center justify-center gap-2">
              <span>✦ O Corte Final ✦</span>
            </div>
            <p className="font-mono-retro text-[13px] sm:text-[14px] text-[#9A9590] leading-[1.8] max-w-[340px] mx-auto mb-7">
              Sete pessoas. Uma noite de filmagem.<br />
              Um único sobrevivente - mas quem?<br /><br />
              <strong className="text-[#F2EAE0]">
                Ouça as fitas. Monte a linha do tempo.<br />
                Preencha as fichas. Conclua a investigação.
              </strong>
            </p>

            <div className="flex flex-col items-center gap-3 w-full">
              <button
                type="button"
                onClick={onStart}
                className="w-full max-w-[300px] min-h-[52px] px-4 py-2 rounded-[12px] bg-[#D94040] text-white border-none font-brunson text-[22px] sm:text-[25px] uppercase tracking-[0.03em] cursor-pointer hover:bg-[#c03434] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] whitespace-nowrap flex items-center justify-center shadow-lg"
              >
                {hasProgress ? 'Continuar Investigação' : 'Iniciar Investigação'}
              </button>

              {hasProgress && onRestart && (
                <button
                  type="button"
                  onClick={onRestart}
                  className="font-mono-retro text-[11px] text-[#9A9590] hover:text-[#E57373] tracking-[0.08em] uppercase underline cursor-pointer bg-transparent border-none py-1 transition-colors"
                >
                  Reiniciar Caso (Limpar Progresso)
                </button>
              )}
            </div>
          </div>
        )}

        {/* How to play tab - Manual de Instruções Investigativas de 1995 */}
        {homeTab === 'how' && (
          <div className="flex flex-col items-center w-full max-w-[460px]">
            {/* Header Docket */}
            <div className="w-full bg-[#141416] border-2 border-[#2b2b34] rounded-[14px] p-4 sm:p-5 text-left mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#22222a]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D94040] animate-pulse" />
                  <span className="font-mono-retro text-[10px] tracking-[0.18em] uppercase text-[#D94040] font-bold">
                    Manual do Investigador · 1995
                  </span>
                </div>
                <span className="font-mono-retro text-[9px] text-[#D4AF37] font-bold">
                  PROCEDIMENTOS DE CAMPO
                </span>
              </div>

              <h2 className="font-brunson text-[28px] sm:text-[34px] uppercase tracking-[0.04em] leading-[0.95] text-[#F2EAE0] mb-2">
                Guia de Investigação
              </h2>
              <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#a0a0b0] leading-[1.6]">
                Siga os 4 passos periciais para reconstituir os fatos do Rancho Esperança e solucionar o caso.
              </p>
            </div>

            {/* Step Cards */}
            <div className="w-full flex flex-col gap-3.5 text-left mb-6">
              {/* Step 1 */}
              <div className="flex gap-3.5 items-start bg-[#141416] border-2 border-[#2b2b34] p-3.5 sm:p-4 rounded-[12px] shadow-md relative overflow-hidden">
                <div className="w-[38px] h-[38px] rounded-[8px] bg-[#0a0a0c] border border-[#2e2e3a] flex items-center justify-center flex-shrink-0">
                  <span className="font-brunson text-[26px] text-[#D94040] leading-none">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono-retro text-[12px] sm:text-[13px] tracking-[0.12em] uppercase text-[#D4AF37] mb-1 font-bold">
                    Ouça as fitas periciais
                  </h3>
                  <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#b0b0be] leading-[1.65]">
                    Examine cada evidência na aba <strong className="text-[#F2EAE0]">Fitas</strong> e leia sua descrição. Quando houver um áudio gravado, utilize o <strong className="text-[#D4AF37]">Gravador Policial</strong>; nas demais, você pode ouvir a descrição pela leitura em voz alta.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3.5 items-start bg-[#141416] border-2 border-[#2b2b34] p-3.5 sm:p-4 rounded-[12px] shadow-md relative overflow-hidden">
                <div className="w-[38px] h-[38px] rounded-[8px] bg-[#0a0a0c] border border-[#2e2e3a] flex items-center justify-center flex-shrink-0">
                  <span className="font-brunson text-[26px] text-[#D94040] leading-none">2</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono-retro text-[12px] sm:text-[13px] tracking-[0.12em] uppercase text-[#D4AF37] mb-1 font-bold">
                    Monte a sequência de fita VHS
                  </h3>
                  <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#b0b0be] leading-[1.65]">
                    Na tela da evidência, clique em <strong className="text-[#F2EAE0]">+ Adicionar à sequência</strong>. Depois, na aba <strong className="text-[#F2EAE0]">Sequência</strong>, organize as 20 evidências em ordem cronológica.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3.5 items-start bg-[#141416] border-2 border-[#2b2b34] p-3.5 sm:p-4 rounded-[12px] shadow-md relative overflow-hidden">
                <div className="w-[38px] h-[38px] rounded-[8px] bg-[#0a0a0c] border border-[#2e2e3a] flex items-center justify-center flex-shrink-0">
                  <span className="font-brunson text-[26px] text-[#D94040] leading-none">3</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono-retro text-[12px] sm:text-[13px] tracking-[0.12em] uppercase text-[#D4AF37] mb-1 font-bold">
                    Preencha as fichas do dossiê
                  </h3>
                  <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#b0b0be] leading-[1.65]">
                    Na aba <strong className="text-[#F2EAE0]">Fichas</strong>, deduza os 4 campos de cada personagem: ordem da morte, local do corpo, horário pericial e causa.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-3.5 items-start bg-[#141416] border-2 border-[#2b2b34] p-3.5 sm:p-4 rounded-[12px] shadow-md relative overflow-hidden">
                <div className="w-[38px] h-[38px] rounded-[8px] bg-[#0a0a0c] border border-[#2e2e3a] flex items-center justify-center flex-shrink-0">
                  <span className="font-brunson text-[26px] text-[#D94040] leading-none">4</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono-retro text-[12px] sm:text-[13px] tracking-[0.12em] uppercase text-[#D4AF37] mb-1 font-bold">
                    Conclua a investigação
                  </h3>
                  <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#b0b0be] leading-[1.65]">
                    Depois de preencher as fichas, clique em <strong className="text-[#D94040]">Concluir Investigação 🔍</strong>. O laudo oficial apresentará o resultado da análise: caso resolvido, resposta parcial, insuficiente ou inconclusiva. Se necessário, você poderá revisar suas respostas e tentar novamente.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onStart}
              className="w-full max-w-[300px] min-h-[52px] px-4 py-2 rounded-[12px] bg-[#D94040] text-white border-none font-brunson text-[22px] sm:text-[25px] uppercase tracking-[0.03em] cursor-pointer hover:bg-[#c03434] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] whitespace-nowrap flex items-center justify-center shadow-lg"
            >
              {hasProgress ? 'Continuar Investigação' : 'Iniciar Investigação'}
            </button>
          </div>
        )}

        {/* Alice Guy tab - Cinema Noir Deep Black (#08080a, #141416) */}
        {homeTab === 'alice' && (
          <div className="flex flex-col items-center w-full max-w-[460px]">
            {/* Alice Guy-Blaché Info - 35mm Film Cartel */}
            <div className="w-full bg-[#141416] border-2 border-[#2a2a32] rounded-[14px] p-4 sm:p-5 text-left mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.8)] relative overflow-hidden">
              {/* Top 35mm Film Sprocket Strip */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#22222a]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="font-mono-retro text-[10px] tracking-[0.18em] uppercase text-[#D4AF37] font-bold">
                    Pioneira do Cinema · 1873 – 1968
                  </span>
                </div>
                <span className="font-mono-retro text-[9px] text-[#707080] font-bold">
                  35MM · 1896
                </span>
              </div>

              <div className="flex justify-center mb-4">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Retrato de Alice Guy-Blaché"
                  loading="eager"
                  decoding="async"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover object-top border-2 border-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.2)] grayscale"
                />
              </div>

              <h2 className="font-brunson text-[32px] sm:text-[38px] uppercase tracking-[0.04em] leading-[0.95] text-[#F2EAE0] mb-1.5">
                Alice Guy-Blaché
              </h2>

              <p className="font-mono-retro text-[11px] text-[#D4AF37] uppercase tracking-[0.1em] font-bold mb-4 flex items-center gap-1.5">
                <span>❖ A Primeira Mulher Cineasta da História</span>
              </p>

              <div className="space-y-3 font-mono-retro text-[12px] sm:text-[13px] text-[#a5a5b5] leading-[1.7]">
                <p>
                  Antes de Hollywood ou dos grandes estúdios, foi <strong className="text-[#F2EAE0]">Alice Guy</strong> quem concebeu o cinema como narrativa ficcional ao dirigir <em className="text-[#D4AF37]">La Fée aux Choux (1896)</em>, quando o mundo ainda via os filmes como mera curiosidade científica.
                </p>
                <p>
                  Dirigiu e produziu mais de 1.000 obras, sendo pioneira no uso de efeitos especiais, sincronização de som primitivo e colorização manual quadro a quadro.
                </p>
                
                {/* Clapperboard Quote Box */}
                <div className="bg-[#09090b] border-l-4 border-l-[#D4AF37] border border-[#22222a] p-3.5 rounded-[8px] text-[11px] sm:text-[12px] italic text-[#F2EAE0] shadow-inner mt-3">
                  "Não há nada de impossível para quem tem determinação e paixão pela sétima arte."
                </div>
              </div>
            </div>

            {/* Produtora Alice Guy Section - 35mm Film Slide */}
            <div className="w-full bg-[#141416] border-2 border-[#2a2a32] rounded-[14px] p-4 sm:p-5 text-center mb-5 shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#22222a]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D94040]" />
                  <span className="font-mono-retro text-[10px] tracking-[0.18em] uppercase text-[#9A9590] font-bold">
                    A Nossa Produtora
                  </span>
                </div>
                <span className="font-mono-retro text-[9px] text-[#D4AF37] font-bold">
                  PROD. ALICE GUY · USCS
                </span>
              </div>

              {/* 35mm Film Slide Frame Container */}
              <div className="relative mx-auto w-full max-w-[340px] bg-[#08080a] p-2.5 rounded-[10px] border-2 border-[#2a2a32] shadow-[0_8px_30px_rgba(0,0,0,0.9)] mb-4">
                {/* Film Sprockets Top */}
                <div className="flex items-center justify-between px-1 mb-2">
                  <span className="font-mono-retro text-[9px] text-[#D4AF37] font-bold">EASTMAN KODAK 35MM</span>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-2 rounded-[1px] bg-[#1a1a20] border border-[#333340]" />
                    <div className="w-1.5 h-2 rounded-[1px] bg-[#1a1a20] border border-[#333340]" />
                    <div className="w-1.5 h-2 rounded-[1px] bg-[#1a1a20] border border-[#333340]" />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[6px] border border-[#2a2a35] bg-[#000]">
                  <img
                    src={`${BASE_URL}assets/aistudio/AG_FC_44a91d2b.jpg`}
                    alt="Produtora Alice Guy - USCS"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto object-contain block mx-auto"
                  />
                </div>

                {/* Film Sprockets Bottom */}
                <div className="flex items-center justify-between px-1 mt-2">
                  <span className="font-mono-retro text-[9px] text-[#808090]">SAFETY FILM 35A</span>
                  <span className="font-mono-retro text-[9px] text-[#D4AF37] font-bold">1995</span>
                </div>
              </div>

              <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#d4cfc5] leading-[1.7] text-left bg-[#09090b] p-3.5 rounded-[9px] border border-[#22222a]">
                A Alice Guy é uma produtora de cinema universitária formada por jovens profissionais apaixonados por criar. Unimos formação acadêmica, experiência e visão autoral para desenvolver projetos de cinema, tv e conteúdo audiovisual.
              </p>
            </div>

            {/* Project "O Corte Final" & Crew Credits - 35mm Frame Grid */}
            <div className="w-full bg-[#141416] border-2 border-[#2a2a32] rounded-[14px] p-4 sm:p-5 text-left mb-6 shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#22222a]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="font-mono-retro text-[10px] tracking-[0.18em] uppercase text-[#D4AF37] font-bold">
                    O Corte Final · Ficha Técnica
                  </span>
                </div>
                <span className="font-mono-retro text-[9px] text-[#707080] font-bold">
                  10 INTEGRANTES
                </span>
              </div>

              <h3 className="font-brunson text-[28px] sm:text-[32px] uppercase tracking-[0.04em] leading-[0.95] text-[#F2EAE0] mb-4">
                Equipe de Produção
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {CREW.map((member, idx) => (
                  <div
                    key={idx}
                    role={idx === 0 ? 'button' : undefined}
                    tabIndex={idx === 0 ? 0 : undefined}
                    onClick={idx === 0 ? () => setJulianaOpen(true) : undefined}
                    onKeyDown={idx === 0 ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setJulianaOpen(true); } } : undefined}
                    aria-label={idx === 0 ? 'Ver animação de Juliana Naka' : undefined}
                    className={idx === 0 ? "bg-[#09090b] border-2 border-[#25252e] rounded-[10px] p-2 overflow-hidden flex flex-col group hover:border-[#D4AF37] transition-all shadow-md cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]" : "bg-[#09090b] border-2 border-[#25252e] rounded-[10px] p-2 overflow-hidden flex flex-col group hover:border-[#D4AF37] transition-all shadow-md"}
                  >
                    {/* 35mm Frame Top Tag */}
                    <div className="flex items-center justify-between px-1 pb-1 mb-1.5 border-b border-[#202028]">
                      <span className="font-mono-retro text-[9px] text-[#D4AF37] font-bold">
                        TAKE #{String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1.5 rounded-[1px] bg-[#202028]" />
                        <div className="w-1 h-1.5 rounded-[1px] bg-[#202028]" />
                      </div>
                    </div>

                    <div className="relative overflow-hidden bg-[#000000] aspect-[3/4] rounded-[6px] border border-[#202028]">
                      <img
                        src={member.foto}
                        alt={`${member.nome} - ${member.cargo}`}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {idx === 0 && (
                        <span className="absolute bottom-2 right-2 rounded bg-black/80 border border-[#D4AF37]/60 px-1.5 py-1 font-mono-retro text-[8px] uppercase tracking-wider text-[#D4AF37]">
                          ▶ Ver animação
                        </span>
                      )}
                    </div>

                    <div className="p-2 flex flex-col justify-center flex-1 text-left">
                      <h4 className="font-brunson text-[16px] sm:text-[18px] text-[#F2EAE0] leading-tight truncate mt-0.5">
                        {member.nome}
                      </h4>
                      <p className="font-mono-retro text-[10px] sm:text-[11px] text-[#D4AF37] uppercase tracking-[0.05em] leading-snug font-bold mt-0.5">
                        {member.cargo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={onStart}
              className="w-full max-w-[300px] min-h-[52px] px-4 py-2 rounded-[12px] bg-[#D94040] text-white border-none font-brunson text-[22px] sm:text-[25px] uppercase tracking-[0.03em] cursor-pointer hover:bg-[#c03434] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] whitespace-nowrap flex items-center justify-center shadow-lg"
            >
              {hasProgress ? 'Continuar Investigação' : 'Iniciar Investigação'}
            </button>
          </div>
        )}

        <div className="mt-8 pb-3 font-mono-retro text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-[#777785] select-none flex flex-col items-center gap-1">
          <div>Identidade Oculta · O Corte Final · Alice Guy</div>
          <div className="text-[#555562] text-[9px] sm:text-[10px] tracking-[0.08em]">
            © Todos os direitos reservados à Produtora Alice Guy
          </div>
        </div>
      </div>

      {julianaOpen && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          role="presentation"
          onClick={() => setJulianaOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="juliana-animation-title"
            className="relative w-full max-w-[560px] min-h-[min(82dvh,760px)] rounded-[14px] border-2 border-[#D4AF37]/70 bg-[#101013] px-5 pt-5 pb-5 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-center flex flex-col justify-between"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setJulianaOpen(false)}
              aria-label="Fechar animação"
              className="absolute right-3 top-3 z-10 w-9 h-9 rounded-full border border-[#4a4140] bg-[#1b1717] text-[#F2EAE0] text-xl hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              ×
            </button>
            <div className="font-mono-retro text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] mb-1">
              Alice Guy · Ficha da equipe
            </div>
            <h2 id="juliana-animation-title" className="font-brunson text-[30px] uppercase tracking-wide text-[#F2EAE0]">
              Juliana Naka
            </h2>
            <p className="font-mono-retro text-[10px] uppercase tracking-[0.15em] text-[#D4AF37]">
              Diretora
            </p>
            <div className="mx-auto my-4 flex min-h-0 flex-1 w-full items-center justify-center overflow-hidden">
              <canvas
                ref={julianaCanvasRef}
                role="img"
                aria-label="Animação pixel art de Juliana Naka dirigindo uma produção"
                className="block h-auto w-auto max-h-[min(58dvh,520px)] max-w-full object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <p className="font-mono-retro text-[9px] text-[#777785] uppercase tracking-wider">
              Direção · Ação · Câmera
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
