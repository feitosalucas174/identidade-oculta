import React, { useState } from 'react';

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
              Seis não sobreviveram — mas quem?<br /><br />
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
                    Examine cada evidência na aba <strong className="text-[#F2EAE0]">Fitas</strong>. Leia a descrição e acione o <strong className="text-[#D4AF37]">Gravador Policial</strong> para escutar o áudio original do caso.
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
                    Dentro da fita, clique em <strong className="text-[#F2EAE0]">+ Adicionar à sequência</strong>. Na aba <strong className="text-[#F2EAE0]">Sequência</strong>, ordene as fitas cronologicamente no videocassete.
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
                    Ao preencher, clique em <strong className="text-[#D94040]">Concluir Investigação 🔍</strong>. O laudo oficial revelará se o caso foi arquivado com sucesso.
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
                    className="bg-[#09090b] border-2 border-[#25252e] rounded-[10px] p-2 overflow-hidden flex flex-col group hover:border-[#D4AF37] transition-all shadow-md"
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
    </div>
  );
};
