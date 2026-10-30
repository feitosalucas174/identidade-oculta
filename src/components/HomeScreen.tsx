import React, { useState } from 'react';

interface HomeScreenProps {
  isOpen: boolean;
  hasProgress?: boolean;
  onStart: () => void;
  onRestart?: () => void;
}

const CREW = [
  {
    nome: 'Juliana Naka',
    cargo: 'Diretora',
    foto: '/assets/aistudio/1_994dbf90.jpg',
  },
  {
    nome: 'Karen Ialago',
    cargo: 'Assistente de Direção',
    foto: '/assets/aistudio/2_d8fcfc06.jpg',
  },
  {
    nome: 'Davi Vieira',
    cargo: 'Produtor e Roteirista',
    foto: '/assets/aistudio/3_259d20ba.jpg',
  },
  {
    nome: 'Lucas Feitosa',
    cargo: 'Diretor de Elenco e Roteirista',
    foto: '/assets/aistudio/4_88dd4e00.jpg',
  },
  {
    nome: 'Lucas Batista',
    cargo: 'Diretor de Fotografia e Roteirista',
    foto: '/assets/aistudio/5_666b334d.jpg',
  },
  {
    nome: 'Vinícius Oliveira',
    cargo: 'Cinegrafista',
    foto: '/assets/aistudio/6_5c870541.jpg',
  },
  {
    nome: 'Pietra Notarberardino',
    cargo: 'Diretora de Arte',
    foto: '/assets/aistudio/7_aa3e89d6.jpg',
  },
  {
    nome: 'Izzy Donatella',
    cargo: 'Maquiadora e Figurinista',
    foto: '/assets/aistudio/8_6ce7ced0.jpg',
  },
  {
    nome: 'Gabriel Elias',
    cargo: 'Editor',
    foto: '/assets/aistudio/9_467f2335.jpg',
  },
  {
    nome: 'Marcello Araújo',
    cargo: 'Sonoplasta',
    foto: '/assets/aistudio/10_df7bff44.jpg',
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
        <div className="flex mb-6 border border-[#303030] rounded-[10px] overflow-hidden w-full max-w-[360px] shadow-sm">
          <button
            type="button"
            onClick={() => setHomeTab('intro')}
            className={`flex-1 h-[40px] bg-transparent border-none font-mono-retro text-[10px] sm:text-[11px] tracking-[0.08em] sm:tracking-[0.12em] uppercase cursor-pointer transition-colors ${
              homeTab === 'intro' ? 'bg-[#222222] text-[#F2EAE0] font-bold' : 'text-[#9A9590] hover:text-[#F2EAE0]'
            }`}
          >
            Início
          </button>
          <button
            type="button"
            onClick={() => setHomeTab('how')}
            className={`flex-1 h-[40px] bg-transparent border-none font-mono-retro text-[10px] sm:text-[11px] tracking-[0.08em] sm:tracking-[0.12em] uppercase cursor-pointer transition-colors ${
              homeTab === 'how' ? 'bg-[#222222] text-[#F2EAE0] font-bold' : 'text-[#9A9590] hover:text-[#F2EAE0]'
            }`}
          >
            Como Jogar
          </button>
          <button
            type="button"
            onClick={() => setHomeTab('alice')}
            className={`flex-1 h-[40px] bg-transparent border-none font-mono-retro text-[10px] sm:text-[11px] tracking-[0.08em] sm:tracking-[0.12em] uppercase cursor-pointer transition-colors ${
              homeTab === 'alice' ? 'bg-[#222222] text-[#7DD5D8] font-bold border-b-2 border-b-[#7DD5D8]' : 'text-[#9A9590] hover:text-[#F2EAE0]'
            }`}
          >
            Alice Guy
          </button>
        </div>

        {/* Intro tab */}
        {homeTab === 'intro' && (
          <div className="flex flex-col items-center w-full max-w-[420px]">
            <p className="font-mono-retro text-[11px] sm:text-[12px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#9A9590] flex items-center justify-center gap-2 mb-4">
              <span className="rec-dot" aria-hidden="true" />
              Caso 001 · Rancho Esperança · 1995
            </p>
            <h1 className="font-brunson text-[clamp(46px,12vw,80px)] uppercase tracking-[0.04em] leading-[0.9] text-[#F2EAE0] mb-[14px]">
              Identidade<br />Oculta
            </h1>
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

        {/* How to play tab */}
        {homeTab === 'how' && (
          <div className="flex flex-col items-center w-full max-w-[420px]">
            <div className="w-full flex flex-col gap-3.5 sm:gap-4 text-left mb-6">
              <div className="flex gap-3 items-start bg-[#181818]/70 border border-[#303030] p-3 sm:p-3.5 rounded-[10px]">
                <span className="font-brunson text-[30px] sm:text-[34px] text-[#D94040] leading-none flex-shrink-0 w-[24px]">1</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono-retro text-[11px] sm:text-[12px] tracking-[0.14em] uppercase text-[#7DD5D8] mb-1 font-bold">
                    Ouça as fitas
                  </h3>
                  <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#9A9590] leading-[1.6]">
                    Abra cada evidência na aba <strong className="text-[#F2EAE0]">Fitas</strong>. Leia a descrição e toque em <strong className="text-[#F2EAE0]">Ouvir</strong> para escutar o relato em áudio. São 21 fitas no total.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-[#181818]/70 border border-[#303030] p-3 sm:p-3.5 rounded-[10px]">
                <span className="font-brunson text-[30px] sm:text-[34px] text-[#D94040] leading-none flex-shrink-0 w-[24px]">2</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono-retro text-[11px] sm:text-[12px] tracking-[0.14em] uppercase text-[#7DD5D8] mb-1 font-bold">
                    Monte a sequência
                  </h3>
                  <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#9A9590] leading-[1.6]">
                    Dentro de cada fita, toque em <strong className="text-[#F2EAE0]">+ Adicionar à sequência</strong>. Na aba <strong className="text-[#F2EAE0]">Sequência</strong>, ordene as fitas cronologicamente com as setas.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-[#181818]/70 border border-[#303030] p-3 sm:p-3.5 rounded-[10px]">
                <span className="font-brunson text-[30px] sm:text-[34px] text-[#D94040] leading-none flex-shrink-0 w-[24px]">3</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono-retro text-[11px] sm:text-[12px] tracking-[0.14em] uppercase text-[#7DD5D8] mb-1 font-bold">
                    Preencha as fichas
                  </h3>
                  <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#9A9590] leading-[1.6]">
                    Na aba <strong className="text-[#F2EAE0]">Fichas</strong>, deduza e preencha para cada personagem: ordem da morte, local, horário e causa com base nas pistas.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-[#181818]/70 border border-[#303030] p-3 sm:p-3.5 rounded-[10px]">
                <span className="font-brunson text-[30px] sm:text-[34px] text-[#D94040] leading-none flex-shrink-0 w-[24px]">4</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono-retro text-[11px] sm:text-[12px] tracking-[0.14em] uppercase text-[#7DD5D8] mb-1 font-bold">
                    Conclua
                  </h3>
                  <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#9A9590] leading-[1.6]">
                    Ao terminar, toque em <strong className="text-[#F2EAE0]">Concluir investigação</strong>. O laudo final revela seus acertos e o destino do Rancho Esperança.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onStart}
              className="w-full max-w-[300px] min-h-[52px] px-4 py-2 rounded-[12px] bg-[#D94040] text-white border-none font-brunson text-[22px] sm:text-[25px] uppercase tracking-[0.03em] cursor-pointer hover:bg-[#c03434] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] whitespace-nowrap flex items-center justify-center shadow-lg"
            >
              {hasProgress ? 'Continuar Investigação' : 'Iniciar Investigação'}
            </button>
          </div>
        )}

        {/* Alice Guy tab */}
        {homeTab === 'alice' && (
          <div className="flex flex-col items-center w-full">
            {/* Alice Guy-Blaché Info */}
            <div className="w-full bg-[#181818]/80 border border-[#303030] p-4 sm:p-5 rounded-[12px] text-left mb-4 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#7DD5D8]" />
                <span className="font-mono-retro text-[10px] tracking-[0.2em] uppercase text-[#7DD5D8]">
                  Pioneira do Cinema · 1873 – 1968
                </span>
              </div>

              <h2 className="font-brunson text-[32px] sm:text-[38px] uppercase tracking-[0.04em] leading-[0.95] text-[#F2EAE0] mb-2">
                Alice Guy-Blaché
              </h2>

              <p className="font-mono-retro text-[11px] text-[#c06ec0] uppercase tracking-[0.1em] mb-4">
                A Primeira Mulher Cineasta da História
              </p>

              <div className="space-y-3 font-mono-retro text-[12px] sm:text-[13px] text-[#9A9590] leading-[1.65]">
                <p>
                  Antes de Hollywood ou dos grandes estúdios, foi <strong className="text-[#F2EAE0]">Alice Guy</strong> quem concebeu o cinema como narrativa ficcional ao dirigir <em className="text-[#7DD5D8]">La Fée aux Choux (1896)</em>, quando o mundo ainda via os filmes como mera curiosidade científica.
                </p>
                <p>
                  Dirigiu e produziu mais de 1.000 obras, pioneira no uso de efeitos especiais, sincronização de som primitivo e colorização manual quadro a quadro.
                </p>
                <div className="bg-[#222222] border-l-2 border-l-[#c06ec0] p-3 rounded text-[11px] sm:text-[12px] italic text-[#F2EAE0]">
                  "Não há nada de impossível para quem tem determinação e paixão pela sétima arte."
                </div>
              </div>
            </div>

            {/* Produtora Alice Guy Section */}
            <div className="w-full bg-[#181818]/80 border border-[#303030] p-4 sm:p-5 rounded-[12px] text-center mb-5 shadow-md">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#D94040]" />
                <span className="font-mono-retro text-[10px] tracking-[0.2em] uppercase text-[#9A9590]">
                  A Nossa Produtora
                </span>
              </div>

              <img
                src="/assets/aistudio/AG_FC_44a91d2b.jpg"
                alt="Produtora Alice Guy - USCS"
                loading="eager"
                decoding="async"
                className="w-full max-w-[320px] h-auto object-contain mx-auto rounded-lg mb-3.5 border border-[#303030] shadow-sm"
              />

              <p className="font-mono-retro text-[12px] sm:text-[13px] text-[#F2EAE0] leading-[1.65] text-left">
                A Alice Guy é uma produtora de cinema universitária formada por jovens profissionais apaixonados por criar. Unimos formação acadêmica, experiência e visão autoral para desenvolver projetos de cinema, tv e conteúdo audiovisual.
              </p>
            </div>

            {/* Project "O Corte Final" & Crew Credits */}
            <div className="w-full bg-[#181818]/80 border border-[#303030] p-4 sm:p-5 rounded-[12px] text-left mb-6 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#7DD5D8]" />
                <span className="font-mono-retro text-[10px] tracking-[0.2em] uppercase text-[#7DD5D8]">
                  O Corte Final · Ficha Técnica
                </span>
              </div>

              <h3 className="font-brunson text-[28px] sm:text-[32px] uppercase tracking-[0.04em] leading-[0.95] text-[#F2EAE0] mb-4">
                Equipe de Produção
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {CREW.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-[#222222] border border-[#303030] rounded-lg overflow-hidden flex flex-col group hover:border-[#7DD5D8] transition-colors"
                  >
                    <div className="relative overflow-hidden bg-[#0D0D0D] aspect-[3/4]">
                      <img
                        src={member.foto}
                        alt={`${member.nome} - ${member.cargo}`}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 sm:p-2.5 flex flex-col justify-center flex-1">
                      <h4 className="font-brunson text-[16px] sm:text-[18px] text-[#F2EAE0] leading-tight truncate">
                        {member.nome}
                      </h4>
                      <p className="font-mono-retro text-[10px] sm:text-[11px] text-[#7DD5D8] uppercase tracking-[0.05em] leading-snug">
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
              className="w-full max-w-[300px] min-h-[52px] px-4 py-2 rounded-[12px] bg-[#D94040] text-white border-none font-brunson text-[22px] sm:text-[25px] uppercase tracking-[0.03em] cursor-pointer hover:bg-[#c03434] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7DD5D8] whitespace-nowrap flex items-center justify-center shadow-lg"
            >
              {hasProgress ? 'Continuar Investigação' : 'Iniciar Investigação'}
            </button>
          </div>
        )}

        <div className="mt-8 pb-2 font-mono-retro text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#555555] select-none">
          Identidade Oculta · Simulação Digital · v1.0
        </div>
      </div>
    </div>
  );
};
