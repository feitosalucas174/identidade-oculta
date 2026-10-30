import { Character, Evidence, FieldKey, FieldOption } from '../types';

export const SVGS: Record<string, string> = {
  'E-01': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="0" y="145" width="300" height="40" fill="#111"/><rect x="148" y="72" width="138" height="68" rx="6" fill="#1a1a1a" stroke="#3a3a3a"/><rect x="168" y="50" width="88" height="26" rx="4" fill="#1a1a1a" stroke="#3a3a3a"/><rect x="172" y="54" width="32" height="15" rx="2" fill="#0a1520" stroke="#223"/><rect x="210" y="54" width="32" height="15" rx="2" fill="#0a1520" stroke="#223"/><circle cx="167" cy="147" r="11" fill="#0a0a0a" stroke="#444"/><circle cx="258" cy="147" r="11" fill="#0a0a0a" stroke="#444"/><ellipse cx="92" cy="76" rx="14" ry="16" fill="#252525" stroke="#444"/><rect x="77" y="90" width="30" height="55" rx="6" fill="#252525" stroke="#444"/><line x1="77" y1="100" x2="56" y2="132" stroke="#252525" stroke-width="12" stroke-linecap="round"/><line x1="107" y1="100" x2="150" y2="118" stroke="#252525" stroke-width="12" stroke-linecap="round"/><circle cx="153" cy="121" r="7" fill="#1a1a1a" stroke="#555"/><circle cx="158" cy="115" r="5" fill="#c0392b"/><rect x="42" y="125" width="22" height="14" rx="2" fill="#8a5a20" stroke="#a06820"/><text x="8" y="14" fill="#666" font-size="8" font-family="monospace">BASTIDOR</text></svg>`,
  'E-02': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="38" y="14" width="224" height="158" rx="2" fill="#f0ecd8" stroke="#ccc"/><line x1="54" y1="18" x2="54" y2="170" stroke="#999" stroke-width="1.5"/><circle cx="54" cy="28" r="3" fill="#777"/><circle cx="54" cy="44" r="3" fill="#777"/><circle cx="54" cy="60" r="3" fill="#777"/><circle cx="54" cy="76" r="3" fill="#777"/><line x1="66" y1="34" x2="245" y2="34" stroke="#ccc"/><line x1="66" y1="50" x2="240" y2="50" stroke="#ccc"/><line x1="66" y1="66" x2="200" y2="66" stroke="#ccc"/><text x="72" y="48" fill="#c0392b" font-size="9" font-family="monospace">refazer  ritmo  cortar</text><rect x="60" y="96" width="180" height="38" rx="2" fill="#fff0f0" stroke="#c0392b"/><text x="68" y="112" fill="#c0392b" font-size="9" font-family="monospace" font-weight="bold">Ninguem toca nessa cena</text><text x="68" y="126" fill="#c0392b" font-size="9" font-family="monospace" font-weight="bold">ate eu dizer que esta pronta.</text><text x="8" y="14" fill="#666" font-size="8" font-family="monospace">DOCUMENTO</text></svg>`,
  'E-03': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#080808"/><rect x="0" y="100" width="300" height="85" fill="#111"/><rect x="232" y="18" width="58" height="118" fill="#3a2000"/><defs><linearGradient id="gA" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c87020" stop-opacity=".9"/><stop offset="1" stop-color="#3a2000" stop-opacity=".1"/></linearGradient></defs><rect x="234" y="20" width="54" height="114" fill="url(#gA)"/><rect x="25" y="118" width="185" height="55" rx="10" fill="#202020" stroke="#2a2a2a" transform="rotate(-4 117 145)"/><rect x="55" y="142" width="52" height="14" rx="3" fill="#1a1a1a" stroke="#333"/><text x="8" y="14" fill="#a06010" font-size="8" font-family="monospace">FOTO DE CENA · JANELA</text></svg>`,
  'E-04': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="14" y="10" width="272" height="165" rx="3" fill="#2a1800" stroke="#4a3010"/><rect x="24" y="18" width="78" height="36" rx="2" fill="#ede8d0" stroke="#bbb"/><text x="29" y="31" fill="#333" font-size="7" font-family="monospace">Quem pegou</text><text x="29" y="42" fill="#333" font-size="7" font-family="monospace">meu fone?</text><rect x="112" y="18" width="78" height="36" rx="2" fill="#ede8d0" stroke="#bbb"/><text x="117" y="31" fill="#333" font-size="7" font-family="monospace">Cade meu</text><text x="117" y="42" fill="#333" font-size="7" font-family="monospace">cinto?</text><rect x="200" y="18" width="78" height="36" rx="2" fill="#ede8d0" stroke="#bbb"/><text x="205" y="31" fill="#333" font-size="7" font-family="monospace">Alguem viu</text><text x="205" y="42" fill="#333" font-size="7" font-family="monospace">a alca?</text><rect x="24" y="64" width="78" height="36" rx="2" fill="#ede8d0" stroke="#bbb"/><text x="29" y="77" fill="#333" font-size="7" font-family="monospace">Cade a</text><text x="29" y="88" fill="#333" font-size="7" font-family="monospace">chave?</text><rect x="48" y="112" width="204" height="48" rx="2" fill="#fff0f0" stroke="#c0392b" stroke-width="2"/><text x="150" y="133" fill="#c0392b" font-size="15" font-family="monospace" font-weight="bold" text-anchor="middle">DENIS,</text><text x="150" y="151" fill="#c0392b" font-size="15" font-family="monospace" font-weight="bold" text-anchor="middle">DEVOLVE!</text><text x="8" y="14" fill="#666" font-size="8" font-family="monospace">MURAL DE RECADOS</text></svg>`,
  'E-05': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="24" y="10" width="252" height="166" rx="2" fill="#f0ece0" stroke="#ccc"/><rect x="34" y="18" width="115" height="11" rx="2" fill="#ddd"/><line x1="34" y1="42" x2="264" y2="42" stroke="#bbb"/><line x1="34" y1="56" x2="248" y2="56" stroke="#bbb"/><line x1="34" y1="70" x2="258" y2="70" stroke="#bbb"/><rect x="30" y="86" width="242" height="22" rx="2" fill="#e8ffe8" stroke="#27ae60"/><text x="38" y="101" fill="#1a6a1a" font-size="9" font-family="monospace">Incisao fina e superficial no pescoco.</text><rect x="30" y="116" width="242" height="22" rx="2" fill="#ffe8e8" stroke="#c0392b"/><text x="38" y="131" fill="#8a1a1a" font-size="9" font-family="monospace">Sem indicios de lamina larga.</text><text x="8" y="14" fill="#666" font-size="8" font-family="monospace">LAUDO PERICIAL</text></svg>`,
  'E-06': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#060810"/><rect x="0" y="100" width="300" height="85" fill="#0a0c14"/><rect x="58" y="102" width="144" height="62" rx="10" fill="#c0c0c0" stroke="#999"/><rect x="198" y="112" width="72" height="48" rx="6" fill="#181818" stroke="#2a2a2a"/><line x1="38" y1="132" x2="18" y2="164" stroke="#2a2a2a" stroke-width="9" stroke-linecap="round"/><rect x="198" y="22" width="50" height="34" rx="2" fill="#1a1a1a" stroke="#333"/><text x="202" y="42" fill="#b89a3e" font-size="13" font-family="monospace" font-weight="bold">5:40</text><circle cx="200" cy="25" r="4" fill="#9e3228"/><line x1="113" y1="162" x2="113" y2="148" stroke="#9a7a30" stroke-width="3"/><circle cx="113" cy="145" r="5" fill="#9a7a30"/><text x="8" y="14" fill="#4060a0" font-size="8" font-family="monospace">FOTO DE CENA · 5h40</text></svg>`,
  'E-07': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><ellipse cx="150" cy="64" rx="18" ry="20" fill="#252525" stroke="#444"/><rect x="130" y="58" width="13" height="8" rx="3" fill="#1a1a1a" stroke="#555"/><rect x="78" y="82" width="142" height="78" rx="8" fill="#252525" stroke="#444"/><rect x="88" y="72" width="62" height="42" rx="4" fill="#1a1a1a" stroke="#333"/><rect x="92" y="75" width="52" height="35" rx="2" fill="#060606"/><circle cx="154" cy="92" r="6" fill="#0a0a0a" stroke="#444"/><circle cx="154" cy="92" r="3" fill="#222"/><path d="M88 86 Q68 72 58 88 Q56 104 78 108" stroke="#5baa7e" stroke-width="3" fill="none" stroke-linecap="round"/><text x="8" y="14" fill="#5baa7e" font-size="8" font-family="monospace">BASTIDOR · FILMADORA</text></svg>`,
  'E-08': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="82" y="0" width="136" height="185" fill="#1a0f00" stroke="#2a1800"/><line x1="102" y1="0" x2="102" y2="185" stroke="#140b00" stroke-width="2"/><line x1="122" y1="0" x2="122" y2="185" stroke="#140b00" stroke-width="2"/><line x1="142" y1="0" x2="142" y2="185" stroke="#140b00" stroke-width="2"/><line x1="162" y1="0" x2="162" y2="185" stroke="#140b00" stroke-width="2"/><line x1="182" y1="0" x2="182" y2="185" stroke="#140b00" stroke-width="2"/><rect x="98" y="42" width="104" height="100" rx="2" fill="#ede8d5" stroke="#ccc"/><circle cx="150" cy="47" r="4" fill="#c0392b"/><text x="105" y="62" fill="#333" font-size="7.5" font-family="monospace">Bob, tira esse fone</text><text x="105" y="74" fill="#333" font-size="7.5" font-family="monospace">pra ouvir quando te</text><text x="105" y="86" fill="#333" font-size="7.5" font-family="monospace">chamam. E vai dormir,</text><text x="105" y="98" fill="#333" font-size="7.5" font-family="monospace">voce ta com cara de</text><text x="105" y="110" fill="#333" font-size="7.5" font-family="monospace">quem nao dorme ha</text><text x="105" y="122" fill="#333" font-size="7.5" font-family="monospace">dois dias.</text><text x="8" y="14" fill="#666" font-size="8" font-family="monospace">BILHETE NA PORTA</text></svg>`,
  'E-09': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#04040a"/><rect x="128" y="52" width="158" height="82" rx="7" fill="#141414" stroke="#222"/><rect x="143" y="33" width="100" height="24" rx="4" fill="#141414" stroke="#222"/><polygon points="128,88 58,58 58,118" fill="rgba(255,255,200,.06)"/><circle cx="146" cy="142" r="12" fill="#0a0a0a" stroke="#333"/><circle cx="260" cy="142" r="12" fill="#0a0a0a" stroke="#333"/><rect x="38" y="128" width="86" height="44" rx="6" fill="#1e1e1e" stroke="#2a2a2a" transform="rotate(7 81 150)"/><circle cx="58" cy="166" r="6" fill="#c0392b"/><rect x="146" y="60" width="40" height="22" rx="2" fill="#0a0a0a" stroke="#222"/><text x="148" y="75" fill="#b89a3e" font-size="12" font-family="monospace" font-weight="bold">3:52</text><text x="8" y="14" fill="#364878" font-size="8" font-family="monospace">FOTO DE CENA · 3h52</text></svg>`,
  'E-10': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="168" y="18" width="112" height="142" rx="3" fill="#1a1500" stroke="#3a3000"/><line x1="174" y1="24" x2="274" y2="24" stroke="#5a4a00" stroke-width="2"/><text x="180" y="48" fill="#4a3a00" font-size="7" font-family="monospace">A Hora do Vampiro</text><text x="180" y="62" fill="#4a3a00" font-size="7" font-family="monospace">O Ultimo Ato</text><text x="180" y="76" fill="#4a3a00" font-size="7" font-family="monospace">Sombras de Outrora</text><ellipse cx="88" cy="68" rx="18" ry="20" fill="#252525" stroke="#444"/><rect x="66" y="86" width="44" height="76" rx="8" fill="#252525" stroke="#3a3a3a"/><line x1="88" y1="162" x2="88" y2="185" stroke="#9a7a30" stroke-width="4" stroke-linecap="round"/><circle cx="88" cy="159" r="7" fill="#9a7a30"/><line x1="66" y1="98" x2="44" y2="132" stroke="#252525" stroke-width="12" stroke-linecap="round"/><line x1="110" y1="98" x2="132" y2="132" stroke="#252525" stroke-width="12" stroke-linecap="round"/><text x="8" y="14" fill="#666" font-size="8" font-family="monospace">BASTIDOR · BENGALA</text></svg>`,
  'E-11': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#030803"/><rect x="0" y="78" width="300" height="107" fill="#060d06"/><ellipse cx="48" cy="28" r="18" fill="#0d180d"/><ellipse cx="98" cy="18" r="12" fill="#0d180d"/><ellipse cx="248" cy="23" r="20" fill="#0d180d"/><circle cx="28" cy="16" r="10" fill="#1a1a1a" opacity=".7"/><rect x="48" y="112" width="164" height="56" rx="10" fill="#1e1e1e" stroke="#2a2a2a" transform="rotate(-7 130 140)"/><line x1="88" y1="138" x2="73" y2="154" stroke="#6a4a00" stroke-width="2"/><line x1="128" y1="132" x2="142" y2="150" stroke="#6a4a00" stroke-width="2"/><line x1="168" y1="136" x2="158" y2="156" stroke="#6a4a00" stroke-width="2"/><ellipse cx="78" cy="157" rx="18" ry="10" fill="#5a008a" opacity=".6"/><ellipse cx="152" cy="161" rx="14" ry="8" fill="#003a8a" opacity=".5"/><ellipse cx="198" cy="148" rx="12" ry="7" fill="#1a6a1a" opacity=".5"/><text x="8" y="14" fill="#2a5a2a" font-size="8" font-family="monospace">FOTO DE CENA · MATAGAL</text></svg>`,
  'E-12': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="0" y="130" width="300" height="55" fill="#111"/><rect x="28" y="98" width="224" height="68" rx="12" fill="#1e1e1e" stroke="#2a2a2a"/><ellipse cx="78" cy="90" rx="20" ry="12" fill="#111" stroke="#5b8dd9" stroke-width="2"/><ellipse cx="66" cy="90" rx="6" ry="6" fill="#0a0a0a" stroke="#5b8dd9"/><ellipse cx="90" cy="90" rx="6" ry="6" fill="#0a0a0a" stroke="#5b8dd9"/><rect x="48" y="118" width="52" height="10" rx="3" fill="#1a1a1a" stroke="#c06ec0" stroke-width="1.5"/><line x1="54" y1="120" x2="54" y2="127" stroke="#c06ec0"/><line x1="64" y1="120" x2="64" y2="127" stroke="#c06ec0"/><line x1="74" y1="120" x2="74" y2="127" stroke="#c06ec0"/><path d="M168 106 Q178 93 188 106" stroke="#5baa7e" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="214" cy="143" r="7" fill="#111" stroke="#c0392b" stroke-width="2"/><circle cx="214" cy="143" r="3" fill="#c0392b"/><rect x="194" y="108" width="24" height="15" rx="2" fill="#0a0a0a" stroke="#b89a3e"/><text x="196" y="119" fill="#b89a3e" font-size="8" font-family="monospace" font-weight="bold">2:10</text><text x="8" y="14" fill="#666" font-size="8" font-family="monospace">FOTO DE CENA · 2h10</text></svg>`,
  'E-13': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="18" y="14" width="158" height="158" rx="2" fill="#e8e0c0" stroke="#bbb"/><text x="28" y="34" fill="#444" font-size="9" font-family="monospace">A Hora do Vampiro</text><text x="28" y="50" fill="#444" font-size="9" font-family="monospace">Janela para o Passado</text><text x="28" y="66" fill="#444" font-size="9" font-family="monospace">O Ultimo Ato (1962)</text><text x="28" y="82" fill="#444" font-size="9" font-family="monospace">Sombras de Outrora</text><text x="28" y="98" fill="#444" font-size="9" font-family="monospace">A Dama do Cinema</text><text x="28" y="114" fill="#444" font-size="9" font-family="monospace">Noite Eterna (1965)</text><rect x="184" y="38" width="96" height="142" rx="2" fill="#d4c070" stroke="#a0902a"/><text x="232" y="84" fill="#5a4a00" font-size="8" font-family="monospace" text-anchor="middle">CINEMA</text><text x="232" y="98" fill="#5a4a00" font-size="8" font-family="monospace" text-anchor="middle">PLAZA</text><text x="232" y="118" fill="#5a4a00" font-size="10" font-family="monospace" text-anchor="middle">1965</text><text x="8" y="14" fill="#666" font-size="8" font-family="monospace">DOCUMENTO</text></svg>`,
  'E-14': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#030803"/><rect x="0" y="78" width="300" height="107" fill="#060d06"/><g opacity=".32"><rect x="158" y="108" width="82" height="42" rx="8" fill="#1a1a1a" stroke="#2a2a2a"/><ellipse cx="184" cy="136" rx="12" ry="7" fill="#5a008a" opacity=".5"/><ellipse cx="218" cy="130" rx="10" ry="6" fill="#1a6a1a" opacity=".5"/></g><rect x="28" y="92" width="98" height="57" rx="8" fill="#1e1e1e" stroke="#2a2a2a"/><rect x="30" y="94" width="82" height="52" rx="6" fill="#141414"/><circle cx="74" cy="120" r="8" fill="#0a0a0a" stroke="#333"/><line x1="118" y1="138" x2="118" y2="168" stroke="#555" stroke-width="3"/><path d="M118 153 Q136 146 150 158 L150 173 Q136 179 118 171 Z" fill="#444" stroke="#555"/><text x="8" y="14" fill="#2a5a2a" font-size="8" font-family="monospace">FOTO · FOICE</text></svg>`,
  'E-15': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="24" y="10" width="252" height="168" rx="2" fill="#e8e4d5" stroke="#bbb"/><line x1="34" y1="18" x2="34" y2="178" stroke="#ddd" stroke-width="1"/><text x="40" y="38" fill="#333" font-size="9" font-family="monospace">Gasolina . . . . . R$ 45,00</text><text x="40" y="54" fill="#333" font-size="9" font-family="monospace">Aluguel equip. . . R$ 280,00</text><text x="40" y="70" fill="#333" font-size="9" font-family="monospace">Alimentacao . . . R$ 90,00</text><line x1="40" y1="80" x2="262" y2="80" stroke="#999"/><text x="40" y="95" fill="#333" font-size="10" font-family="monospace" font-weight="bold">TOTAL . . . . . . R$ 415,00</text><ellipse cx="222" cy="92" rx="38" ry="11" fill="none" stroke="#c0392b" stroke-width="2.5"/><text x="150" y="122" fill="#c0392b" font-size="15" font-family="monospace" font-weight="bold" text-anchor="middle">ESTOURAMOS</text><text x="40" y="148" fill="#555" font-size="8" font-family="monospace" font-style="italic">Se esse filme nao der dinheiro,</text><text x="40" y="160" fill="#555" font-size="8" font-family="monospace" font-style="italic">meus pais vao me matar.</text><text x="8" y="14" fill="#666" font-size="8" font-family="monospace">DESPESAS</text></svg>`,
  'E-16': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><ellipse cx="150" cy="52" rx="18" ry="20" fill="#252525" stroke="#444"/><rect x="124" y="70" width="52" height="88" rx="8" fill="#252525" stroke="#3a3a3a"/><rect x="116" y="92" width="68" height="16" rx="4" fill="#1a1a1a" stroke="#c06ec0" stroke-width="1.5"/><line x1="126" y1="94" x2="126" y2="107" stroke="#c06ec0"/><line x1="136" y1="94" x2="136" y2="107" stroke="#c06ec0"/><line x1="146" y1="94" x2="146" y2="107" stroke="#c06ec0"/><line x1="156" y1="94" x2="156" y2="107" stroke="#c06ec0"/><circle cx="58" cy="148" r="18" fill="#0e0e18" stroke="#1a1a30"/><circle cx="70" cy="155" r="14" fill="#1a0a2a" stroke="#2a1040"/><circle cx="210" cy="146" r="16" fill="#0e1a0e" stroke="#1a2a1a"/><circle cx="226" cy="154" r="12" fill="#0a1a0a" stroke="#102010"/><text x="8" y="14" fill="#c06ec0" font-size="8" font-family="monospace">BASTIDOR · CINTO</text></svg>`,
  'E-17': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><ellipse cx="150" cy="48" rx="18" ry="20" fill="#252525" stroke="#444"/><path d="M113 62 Q150 56 187 62" stroke="#5b8dd9" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="116" cy="62" r="9" fill="#0a0a0a" stroke="#5b8dd9" stroke-width="2"/><circle cx="184" cy="62" r="9" fill="#0a0a0a" stroke="#5b8dd9" stroke-width="2"/><rect x="124" y="68" width="52" height="78" rx="8" fill="#252525" stroke="#3a3a3a"/><rect x="78" y="120" width="134" height="58" rx="4" fill="#1a1a1a" stroke="#333"/><rect x="88" y="128" width="68" height="40" rx="3" fill="#111" stroke="#2a2a2a"/><line x1="176" y1="133" x2="202" y2="122" stroke="#555" stroke-width="2"/><circle cx="204" cy="120" r="5" fill="#333" stroke="#555"/><text x="8" y="14" fill="#5b8dd9" font-size="8" font-family="monospace">BASTIDOR · FONE + GRAVADOR</text></svg>`,
  'E-18': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="28" y="18" width="5" height="160" fill="#333" opacity=".5"/><ellipse cx="150" cy="52" rx="18" ry="20" fill="#252525" stroke="#444"/><rect x="124" y="70" width="52" height="82" rx="8" fill="#252525" stroke="#3a3a3a"/><line x1="124" y1="86" x2="103" y2="118" stroke="#252525" stroke-width="12" stroke-linecap="round"/><rect x="76" y="110" width="32" height="42" rx="3" fill="#1a1a1a" stroke="#555"/><line x1="78" y1="113" x2="78" y2="152" stroke="#444" stroke-width="1.5"/><circle cx="88" cy="110" r="4" fill="#c0392b"/><text x="8" y="14" fill="#d94f4f" font-size="8" font-family="monospace">BASTIDOR · BLOQUINHO</text></svg>`,
  'E-19': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="1" y="1" width="298" height="183" fill="none" stroke="#b89a3e" stroke-width="1.5"/><ellipse cx="150" cy="42" rx="18" ry="20" fill="#252525" stroke="#555"/><rect x="124" y="60" width="52" height="92" rx="8" fill="#252525" stroke="#555"/><path d="M108 72 Q150 65 192 72" stroke="#5b8dd9" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="110" cy="71" r="8" fill="#0a0a0a" stroke="#5b8dd9" stroke-width="2"/><circle cx="190" cy="71" r="8" fill="#0a0a0a" stroke="#5b8dd9" stroke-width="2"/><rect x="106" y="96" width="88" height="14" rx="4" fill="#1a1a1a" stroke="#c06ec0" stroke-width="1.5"/><line x1="116" y1="98" x2="116" y2="109" stroke="#c06ec0"/><line x1="128" y1="98" x2="128" y2="109" stroke="#c06ec0"/><line x1="140" y1="98" x2="140" y2="109" stroke="#c06ec0"/><path d="M176 65 Q196 48 212 68" stroke="#5baa7e" stroke-width="3" fill="none" stroke-linecap="round"/><text x="8" y="14" fill="#b89a3e" font-size="8" font-family="monospace">BASTIDOR · 3 OBJETOS</text></svg>`,
  'E-20': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#030803"/><rect x="48" y="38" width="178" height="112" rx="10" fill="#1e1e1e" stroke="#333" transform="rotate(-10 137 94)"/><rect x="52" y="42" width="148" height="92" rx="8" fill="#141414" stroke="#222" transform="rotate(-10 126 88)"/><circle cx="128" cy="93" r="20" fill="#0a0a0a" stroke="#2a2a2a" transform="rotate(-10 128 93)"/><circle cx="128" cy="93" r="8" fill="#111" stroke="#333"/><line x1="192" y1="48" x2="212" y2="28" stroke="#9e3228" stroke-width="2.5" stroke-linecap="round"/><line x1="212" y1="48" x2="192" y2="28" stroke="#9e3228" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="82" cy="73" rx="10" ry="7" fill="#5a008a" opacity=".7" transform="rotate(-10 82 73)"/><ellipse cx="162" cy="118" rx="8" ry="5" fill="#003a8a" opacity=".6" transform="rotate(-10 162 118)"/><text x="8" y="14" fill="#5baa7e" font-size="8" font-family="monospace">DETALHE · SEM ALCA</text></svg>`,
  'E-21': `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="185" fill="#0d0d0d"/><rect x="24" y="10" width="252" height="166" rx="2" fill="#f0ece0" stroke="#ccc"/><rect x="34" y="18" width="122" height="11" rx="2" fill="#ddd"/><line x1="34" y1="42" x2="264" y2="42" stroke="#bbb"/><line x1="34" y1="56" x2="252" y2="56" stroke="#bbb"/><line x1="34" y1="70" x2="260" y2="70" stroke="#bbb"/><rect x="30" y="84" width="242" height="20" rx="2" fill="#fff8e8" stroke="#b89a3e"/><text x="38" y="98" fill="#6a5000" font-size="8.5" font-family="monospace">Corpo sem condicoes de identificacao.</text><rect x="30" y="112" width="242" height="20" rx="2" fill="#ffe8e8" stroke="#c0392b"/><text x="38" y="126" fill="#8a1a1a" font-size="8.5" font-family="monospace">Nao foi possivel confirmar qual morreu.</text><text x="218" y="170" fill="#666" font-size="42" font-family="monospace" opacity=".18">?</text><text x="8" y="14" fill="#666" font-size="8" font-family="monospace">LAUDO INCONCLUSIVO</text></svg>`
};

export const PHOTOS: Record<string, string> = {
  'E-01': '/Tratadas/CARRO%20INTERNO.jpg',
  'E-02': '/Tratadas/CHECKLIST%20MONICA.jpg',
  'E-03': '/Tratadas/JANELA%20M%C3%83O.jpg',
  'E-04': '/Tratadas/CHECKLIST%20DENIS.jpg',
  'E-05': '/Tratadas/ANOTA%C3%87%C3%83O%20POLICIAL.jpg',
  'E-06': '/Tratadas/CLAUDIO_VERA.jpg',
  'E-07': '/Tratadas/CAMERA%20MARCOS.jpg',
  'E-08': '/Tratadas/FONE%20BOB.jpg',
  'E-09': '/Tratadas/SAMUEL.jpg',
  'E-10': '/Tratadas/PROVA%20DE%20ANTIGUIDADE.jpg',
  'E-11': '/Tratadas/MONICA.jpg',
  'E-12': '/Tratadas/DENIS.jpg',
  'E-13': '/Tratadas/BILHETES%20CLAUDIO.jpg',
  'E-14': '/Tratadas/MARCOS%202.jpg',
  'E-15': '/Tratadas/DESPESAS_SAMUEL.jpg',
  'E-16': '/Tratadas/MONICA%202.jpg',
  'E-17': '/Tratadas/BOB.jpg',
  'E-18': '/Tratadas/ANOTA%C3%87%C3%95ES%20VERA.jpg',
  'E-19': '/Tratadas/PISTA%20VERA.jpg',
  'E-20': '/Tratadas/MARCOS.jpg',
  'E-21': '/Tratadas/ANOTA%C3%87%C3%83O%20FINAL.jpg'
};

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const EV: Evidence[] = [
  {
    id: 'E-01',
    tipo: 'Bastidor',
    desc: 'Interior do carro. Bancos do motorista e do passageiro vazios, porta aberta. Sangue na janela pelo lado de fora. Uma chave de carro no chão — e marcas de sangue no encosto de ambos os bancos. Alguém saiu daqui às pressas ou foi retirado à força. Este é o carro de Samuel — só ele tinha a chave. Quem estava aqui antes?'
  },
  {
    id: 'E-02',
    tipo: 'Documento',
    desc: 'Essa folha estava em cima da mesa. Marcador rosa — letra de Mônica. "Refazer. Ritmo. Cortar." E no lado direito: "Ninguém nessa cena até eu dizer que está pronta." A cena que ninguém podia tocar. Por que ela se importava tanto com isso?'
  },
  {
    id: 'E-03',
    tipo: 'Foto de Cena',
    desc: 'A janela do quarto. Uma marca de mão ensanguentada impressa no vidro — dedos espalhados como quem tentou se segurar. Bob passou a tarde toda no quarto. Perto da janela, marcas de agressão física no chão e vestígios de luta. A bolsa com o gravador seria levada daqui para a sala mais tarde. Nenhuma lâmina foi usada aqui.'
  },
  {
    id: 'E-04',
    tipo: 'Documento',
    desc: 'Um papel encontrado com Dênis. Uma lista — e todos os itens têm um ✓. Fone do Bob. Cinto. Alça da câmera. Chave. Ele não pegou por distração: ele rastreou, planejou, coletou. No canto inferior, um coração desenhado: "D+V". Dênis e Vera. Isso muda tudo sobre o motivo.'
  },
  {
    id: 'E-05',
    tipo: 'Laudo',
    desc: 'Laudo em papel avulso, junto às fitas. Letra de quem anotava rápido no local. "Incisão fina e superficial no pescoço. Sem indícios de lâmina larga." Isso exclui a foice — exclui qualquer instrumento pesado. Lâmina pequena, precisa. Quem aqui carregava isso?'
  },
  {
    id: 'E-06',
    tipo: 'Foto de Cena',
    desc: 'Sala. A luz azulada do amanhecer entra pelas frestas. O relógio na parede parado em 5h40 marca a estimativa do confronto final. Há dois corpos no local: Dênis ao fundo, com sangue já seco da morte que ocorreu às 2h10, e a última vítima recente sob o lençol. Ao lado, dois objetos distintos: uma bengala e um bloquinho de notas — de pessoas diferentes. Não foi possível confirmar qual dos dois não sobreviveu. O laudo dirá o mesmo.'
  },
  {
    id: 'E-07',
    tipo: 'Bastidor',
    desc: 'A filmadora de Marcos. Panasonic, com a alça intacta. Esta foto é de bastidor, antes da noite — a câmera que ele carregava em toda gravação. Mais tarde, Marcos seria encontrado no matagal, mas a filmadora já não estava com ele: alguém a levou para dentro da casa (veja E-12 e E-20). A câmera que viu tudo.'
  },
  {
    id: 'E-08',
    tipo: 'Documento',
    desc: 'O fone de Bob. Encontrado sobre a mochila dele, no quarto. Headphone simples, amortecedor desgastado de tanto uso. O bilhete na porta dizia pra ele tirar. Ele não tirou. Com esse fone no ouvido, Bob provavelmente não ouviu nada chegar.'
  },
  {
    id: 'E-09',
    tipo: 'Foto de Cena',
    desc: 'Óculos caídos na terra batida, fora do rancho, perto do carro. Manchas de sangue na armação. Dênis e Marcos também usavam óculos, mas os de Marcos ficaram no matagal e Dênis estava na sala — estes pertenciam a Samuel. A armação está torcida: saíram do rosto com muita força. O relógio do painel marcava 3h52 quando a porta ficou aberta.'
  },
  {
    id: 'E-10',
    tipo: 'Bastidor',
    desc: 'Óculos de leitura sobre um jornal. Papel amarelado, manchetes ilegíveis de longe — mas a data na dobra é dos anos 60. Esse jornal não é de 1995. Alguém guardou isso por décadas. Cláudio. A bengala, o casaco, os títulos de filmes antigos — e agora esse jornal. Ele conhecia este lugar antes de todos.'
  },
  {
    id: 'E-11',
    tipo: 'Foto de Cena',
    desc: 'Matagal. Uma corda de iluminação com manchas de sangue enrolada num galho baixo. No chão, manchas de tinta de maquiagem artística derramadas. O laudo confirmou: incisão fina e superficial no pescoço feita por lâmina pequena. Mônica foi atacada aqui enquanto buscava material de cena.'
  },
  {
    id: 'E-12',
    tipo: 'Foto de Cena',
    desc: 'Sala. A filmadora caída no chão, ao lado de um charco de sangue. Um relógio digital quebrado marcando 2h10 no chão da sala. Facadas múltiplas. Dênis carregava coisas que não eram dele: a câmera de Marcos, os objetos do mural. Tudo aqui. Essa cena fecha a linha do tempo de Dênis.'
  },
  {
    id: 'E-13',
    tipo: 'Documento',
    desc: 'Um envelope com cartas dobradas, um esboço a lápis e uma fotografia em preto e branco. A mulher no desenho e na foto é a mesma. Pelos papéis amarelados, isso tem décadas. Cláudio guarda isso há trinta anos. Essa mulher é o motivo pelo qual ele voltou ao rancho.'
  },
  {
    id: 'E-14',
    tipo: 'Foto de Cena',
    desc: 'Matagal. Marcas profundas de lâmina larga no chão e na vegetação — uma foice foi usada neste local. Perto dos galhos quebrados, rastros de sangue ligam o ponto de ataque de Marcos ao matagal denso. Mônica também estava nesta área, mas aqui a causa da morte foi o golpe de lâmina pesada.'
  },
  {
    id: 'E-15',
    tipo: 'Documento',
    desc: 'Uma folha de despesas da produção. Gasolina, equipamento, alimentação. O total circulado em vermelho. Na margem, manuscrito: "Se esse filme não der dinheiro, meus pais vão me matar." Pressão séria. Motivo suficiente pra explodir.'
  },
  {
    id: 'E-16',
    tipo: 'Bastidor',
    desc: 'Pincel e frasco de tinta de efeitos do departamento de arte, cobertos por respingos de sangue nas raízes de uma árvore no matagal. Mônica carregava o material de maquiagem e figurino para preparar o cenário antes da gravação noturna. Este achado comprova que ela já estava no local preparando a cena antes do ataque.'
  },
  {
    id: 'E-17',
    tipo: 'Bastidor',
    desc: 'Bolsa do gravador com o equipamento de áudio de Bob. Alguém retirou a bolsa do quarto e a deixou na sala. Perto dela, a fita desenrolada e o cabo grosso de microfone boom com manchas escuras na ponta. Este equipamento esteve no quarto e depois foi movido para a sala.'
  },
  {
    id: 'E-18',
    tipo: 'Bastidor',
    desc: 'O bloquinho de agenda de Vera. Letra em caneta vermelha, organizada. "Rancho Esperança · 13/10/1995. 08h00 encontro da equipe. 08h30 marcado com o sr. Cláudio." Ela sabia quem Cláudio era antes de chegar. Planejou o encontro. A mancha na parte inferior do papel — não é tinta.'
  },
  {
    id: 'E-19',
    tipo: 'Bastidor',
    desc: 'Estojo de pó compacto de maquiagem com etiqueta manuscrita: "VERA". Encontrado com resíduos de pó espalhados perto do carro. Alguém utilizou este pó compacto durante o confronto dentro do veículo para desorientar o agressor antes de tentar escapar. A etiqueta confirma a presença de Vera durante a cena no carro.'
  },
  {
    id: 'E-20',
    tipo: 'Detalhe',
    desc: 'Óculos caídos no matagal — com marcas de sangue na armação. Pertenciam a Marcos. Ao redor, galhos quebrados e marcas no solo indicam um ataque violento no escuro. A filmadora Panasonic que ele carregava sumiu — só o encaixe da alça vazio ficou no chão. A câmera foi separada dele à força.'
  },
  {
    id: 'E-21',
    tipo: 'Laudo',
    desc: 'A última anotação. Papel avulso, junto à fita final, como se precisasse que isso ficasse registrado. "Corpo sem condições de identificação. Não foi possível dizer quem morreu." E um ponto de interrogação, manuscrito. O antigo detetive do caso ainda estava procurando. Agora eu também.'
  }
];

export const PERS: Character[] = [
  { id: 'Bob', nome: 'Roberto (Bob)', cor: '#5b8dd9', idade: 22 },
  { id: 'Monica', nome: 'Mônica', cor: '#c06ec0', idade: 22 },
  { id: 'Marcos', nome: 'Marcos', cor: '#5baa7e', idade: 20 },
  { id: 'Denis', nome: 'Dênis', cor: '#aaaaaa', idade: 20 },
  { id: 'Samuel', nome: 'Samuel', cor: '#d98c5b', idade: 24 },
  { id: 'Vera', nome: 'Vera', cor: '#d94f4f', idade: 23 },
  { id: 'Claudio', nome: 'Cláudio', cor: '#7b8fa6', idade: 65 }
];

export const GAB: Record<
  string,
  {
    especial?: boolean;
    ordem?: string[];
    local: string[];
    quando: string[];
    como: string[];
  }
> = {
  Bob: {
    ordem: ['1', 'primeiro'],
    local: ['quarto', 'dentro'],
    quando: ['tarde', 'entardecer'],
    como: ['espanc', 'pancada', 'agressao', 'trauma', 'contus']
  },
  Monica: {
    ordem: ['2', 'segunda'],
    local: ['matagal', 'fora', 'mata'],
    quando: ['noite'],
    como: ['espanc', 'corte', 'pescoco', 'fina', 'navalha']
  },
  Marcos: {
    ordem: ['3', 'terceiro'],
    local: ['matagal', 'fora', 'mata'],
    quando: ['noite'],
    como: ['foice', 'golpe', 'larga']
  },
  Denis: {
    ordem: ['4', 'quarto'],
    local: ['sala', 'dentro'],
    quando: ['madrugada', '2h', '210'],
    como: ['facada', 'faca', 'esfaq']
  },
  Samuel: {
    ordem: ['5', 'quinto'],
    local: ['carro', 'fora'],
    quando: ['madrugada', '3h', '352'],
    como: ['facada', 'faca', 'esfaq']
  },
  Vera: {
    especial: true,
    local: ['sala', 'dentro'],
    quando: ['amanhecer', '5h', '540'],
    como: ['tiro', 'bala', 'disparo', 'arma']
  },
  Claudio: {
    especial: true,
    local: ['sala', 'dentro'],
    quando: ['amanhecer', '5h', '540'],
    como: ['tiro', 'bala', 'disparo', 'arma']
  }
};

export const OPCOES: Record<FieldKey, FieldOption[]> = {
  ordem: [
    { v: '', l: '— escolha —' },
    { v: '1 primeiro', l: '1.° — Primeiro' },
    { v: '2 segunda', l: '2.° — Segundo' },
    { v: '3 terceiro', l: '3.° — Terceiro' },
    { v: '4 quarto', l: '4.° — Quarto' },
    { v: '5 quinto', l: '5.° — Quinto' },
    { v: '6', l: '6.° — Ambíguo' }
  ],
  local: [
    { v: '', l: '— escolha —' },
    { v: 'quarto dentro', l: 'Quarto (dentro)' },
    { v: 'sala dentro', l: 'Sala (dentro)' },
    { v: 'matagal fora mata', l: 'Matagal (fora)' },
    { v: 'carro fora', l: 'Perto do carro (fora)' }
  ],
  quando: [
    { v: '', l: '— escolha —' },
    { v: 'tarde entardecer', l: 'Final da tarde' },
    { v: 'noite', l: 'Noite' },
    { v: 'madrugada 2h 210', l: 'Madrugada (2h10)' },
    { v: 'madrugada 3h 352', l: 'Madrugada (3h52)' },
    { v: 'amanhecer 5h 540', l: 'Amanhecer (5h40)' }
  ],
  como: [
    { v: '', l: '— escolha —' },
    { v: 'espanc pancada agressao trauma contus', l: 'Espancamento / Agressão' },
    { v: 'corte pescoco fina navalha', l: 'Incisão no pescoço (Lâmina pequena)' },
    { v: 'foice golpe larga', l: 'Golpe de lâmina larga (Foice)' },
    { v: 'facada faca esfaq', l: 'Múltiplas facadas' },
    { v: 'tiro bala disparo arma', l: 'Disparo de arma de fogo' }
  ]
};

export function match(userVal: string, targets: string[]): boolean {
  if (!userVal) return false;
  return targets.some(t => userVal.toLowerCase().includes(t.toLowerCase()));
}

export function getOptionLabel(field: FieldKey, val: string): string {
  const opts = OPCOES[field];
  const found = opts.find(o => o.v === val);
  return found ? found.l : val;
}

export const ENDINGS = {
  total: {
    title: 'Arquivo Encerrado',
    stamp: 'CASO RESOLVIDO',
    color: '#4CAF50',
    info: 'Sua análise reconstruiu a ordem dos fatos e o destino de todos os envolvidos no Rancho Esperança. O dossiê foi enviado às autoridades com a cronologia completa.'
  },
  'fichas-ok': {
    title: 'Vítimas Identificadas',
    stamp: 'RESPOSTA PARCIAL',
    color: '#FFB74D',
    info: 'Você identificou a ordem e as causas das mortes, mas a sequência de fitas da linha do tempo ainda possui lacunas cronológicas. Revise a ordem das evidências.'
  },
  'seq-ok': {
    title: 'Cronologia Reconstituída',
    stamp: 'RESPOSTA PARCIAL',
    color: '#FFB74D',
    info: 'A sequência de fitas na linha do tempo está perfeita, mas há erros nas fichas de identificação dos personagens. Verifique os laudos periciais e os locais.'
  },
  parcial: {
    title: 'Inquérito Incompleto',
    stamp: 'INSUFICIENTE',
    color: '#E57373',
    info: 'Há acertos relevantes, mas a investigação ainda contém inconsistências significativas tanto nas fichas quanto na sequência temporal.'
  },
  inconclusivo: {
    title: 'Investigação Inconclusiva',
    stamp: 'INCONCLUSIVO',
    color: '#E57373',
    info: 'As deduções apresentadas divergem das evidências colhidas no local. Reouça as fitas e examine atentamente as notas de bastidores.'
  }
};

export const MOCK_FICHAS: Record<string, Record<FieldKey, string>> = {
  Bob: {
    ordem: '1 primeiro',
    local: 'quarto dentro',
    quando: 'tarde entardecer',
    como: 'espanc pancada agressao trauma contus'
  },
  Monica: {
    ordem: '2 segunda',
    local: 'matagal fora mata',
    quando: 'noite',
    como: 'corte pescoco fina navalha'
  },
  Marcos: {
    ordem: '3 terceiro',
    local: 'matagal fora mata',
    quando: 'noite',
    como: 'foice golpe larga'
  },
  Denis: {
    ordem: '4 quarto',
    local: 'sala dentro',
    quando: 'madrugada 2h 210',
    como: 'facada faca esfaq'
  },
  Samuel: {
    ordem: '5 quinto',
    local: 'carro fora',
    quando: 'madrugada 3h 352',
    como: 'facada faca esfaq'
  },
  Vera: {
    ordem: '6',
    local: 'sala dentro',
    quando: 'amanhecer 5h 540',
    como: 'tiro bala disparo arma'
  },
  Claudio: {
    ordem: '6',
    local: 'sala dentro',
    quando: 'amanhecer 5h 540',
    como: 'tiro bala disparo arma'
  }
};

export const MOCK_FICHAS_WRONG: Record<string, Record<FieldKey, string>> = {
  Bob: {
    ordem: '2 segunda',
    local: 'sala dentro',
    quando: 'noite',
    como: 'facada faca esfaq'
  },
  Monica: {
    ordem: '1 primeiro',
    local: 'quarto dentro',
    quando: 'tarde entardecer',
    como: 'tiro bala disparo arma'
  },
  Marcos: {
    ordem: '4 quarto',
    local: 'carro fora',
    quando: 'madrugada 3h 352',
    como: 'corte pescoco fina navalha'
  },
  Denis: {
    ordem: '3 terceiro',
    local: 'matagal fora mata',
    quando: 'noite',
    como: 'foice golpe larga'
  },
  Samuel: {
    ordem: '5 quinto',
    local: 'sala dentro',
    quando: 'amanhecer 5h 540',
    como: 'espanc pancada agressao trauma contus'
  },
  Vera: {
    ordem: '1 primeiro',
    local: 'quarto dentro',
    quando: 'tarde entardecer',
    como: 'facada faca esfaq'
  },
  Claudio: {
    ordem: '2 segunda',
    local: 'matagal fora mata',
    quando: 'noite',
    como: 'foice golpe larga'
  }
};

export const MOCK_SEQ = [
  'E-08',
  'E-03',
  'E-17',
  'E-02',
  'E-11',
  'E-16',
  'E-07',
  'E-20',
  'E-14',
  'E-15',
  'E-04',
  'E-12',
  'E-01',
  'E-19',
  'E-09',
  'E-05',
  'E-18',
  'E-10',
  'E-13',
  'E-06',
  'E-21'
];

export const MOCK_SEQ_WRONG = [
  'E-21',
  'E-20',
  'E-19',
  'E-18',
  'E-17',
  'E-16',
  'E-15',
  'E-14',
  'E-13',
  'E-12',
  'E-11',
  'E-10',
  'E-09',
  'E-08',
  'E-07',
  'E-06',
  'E-05',
  'E-04',
  'E-03',
  'E-02',
  'E-01'
];

export const HINTS: Record<string, Record<FieldKey, string>> = {
  Bob: {
    ordem: 'E-08 e E-03 indicam que Bob foi atacado primeiro no quarto.',
    local: 'E-03 e E-08 confirmam que ele estava no quarto.',
    quando: 'E-03 mostra o início no final da tarde.',
    como: 'E-03 indica lesões por trauma/pancada, sem lâminas.'
  },
  Monica: {
    ordem: 'E-11 e E-16 mostram Mônica atacada no matagal no início da noite.',
    local: 'E-11 e E-16 mostram o matagal.',
    quando: 'Aconteceu durante a noite.',
    como: 'E-05 confirma corte fino no pescoço (lâmina pequena).'
  },
  Marcos: {
    ordem: 'E-14 e E-20 indicam o ataque a Marcos no matagal.',
    local: 'E-14 e E-20 mostram o matagal.',
    quando: 'Aconteceu durante a noite.',
    como: 'E-14 confirma marcas de lâmina larga (foice).'
  },
  Denis: {
    ordem: 'E-12 registra a morte de Dênis às 2h10.',
    local: 'E-12 e E-06 indicam o corpo na sala.',
    quando: 'E-12 mostra o relógio parado às 2h10.',
    como: 'E-12 confirma múltiplas facadas.'
  },
  Samuel: {
    ordem: 'E-01 e E-09 mostram o confronto no carro às 3h52.',
    local: 'E-01 e E-09 mostram a área perto do carro.',
    quando: 'E-09 indica o horário de 3h52.',
    como: 'E-01 e E-09 indicam facadas no veículo.'
  },
  Vera: {
    ordem: 'E-06 e E-21 confirmam que a vítima final às 5h40 é ambígua (Vera ou Cláudio).',
    local: 'E-06 indica a sala no confronto final.',
    quando: 'E-06 marca o amanhecer (5h40).',
    como: 'E-06 indica disparo de arma de fogo.'
  },
  Claudio: {
    ordem: 'E-06 e E-21 confirmam que a vítima final às 5h40 é ambígua (Vera ou Cláudio).',
    local: 'E-06 indica a sala no confronto final.',
    quando: 'E-06 marca o amanhecer (5h40).',
    como: 'E-06 indica disparo de arma de fogo.'
  }
};
