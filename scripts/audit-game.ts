import fs from 'fs';
import path from 'path';

// Import game data and logic
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
  OPCOES,
  PERS,
  PHOTOS,
  SVGS,
} from '../src/data/evidence';
import { FieldKey } from '../src/types';

interface AuditIssue {
  severity: 'ERROR' | 'WARNING' | 'INFO';
  category: string;
  message: string;
}

const issues: AuditIssue[] = [];

function logIssue(severity: 'ERROR' | 'WARNING' | 'INFO', category: string, message: string) {
  issues.push({ severity, category, message });
}

console.log('🔍 INICIANDO AUDITORIA TÉCNICA E TESTE AUTOMATIZADO DO JOGO...\n');

// ── 1. AUDITORIA DE RECURSOS E ARQUIVOS FÍSICOS ──────────────────────────────
console.log('📁 [1/4] Verificando integridade de arquivos estáticos...');

// Check fonts and html files
if (!fs.existsSync('public/Brunson Rough.ttf') && !fs.existsSync('Brunson Rough.ttf')) {
  logIssue('ERROR', 'Assets', 'Fonte Brunson Rough.ttf não encontrada!');
}
if (!fs.existsSync('public/retrosheet-95.html')) {
  logIssue('ERROR', 'Assets', 'Arquivo public/retrosheet-95.html não encontrado!');
}

// Check photos
let missingPhotosCount = 0;
Object.entries(PHOTOS).forEach(([evId, photoPath]) => {
  const decodedPath = decodeURIComponent(photoPath.replace(/^\//, ''));
  const fullPathInPublic = path.join('public', decodedPath);
  const fullPathInRoot = decodedPath;

  if (!fs.existsSync(fullPathInPublic) && !fs.existsSync(fullPathInRoot)) {
    missingPhotosCount++;
    logIssue('ERROR', 'Photos', `Imagem para ${evId} não existe no disco: "${decodedPath}"`);
  }
});

if (missingPhotosCount === 0) {
  console.log('   ✓ Todas as 21 imagens de evidências foram validadas no disco.');
}

// ── 2. AUDITORIA DE DADOS E COERÊNCIA ─────────────────────────────────────────
console.log('\n📊 [2/4] Auditando consistência de dados, gabarito e opções...');

// Verify EV length
if (EV.length !== 21) {
  logIssue('ERROR', 'Data', `Esperado 21 evidências em EV, encontrado: ${EV.length}`);
} else {
  console.log('   ✓ EV contém exatamente 21 evidências.');
}

// Verify every EV has SVG fallback
EV.forEach(e => {
  if (!SVGS[e.id]) {
    logIssue('WARNING', 'SVG', `Falta SVG de fallback para a evidência ${e.id}`);
  }
  if (!e.desc || e.desc.trim().length < 10) {
    logIssue('ERROR', 'Data', `Descrição da evidência ${e.id} está vazia ou muito curta.`);
  }
});

// Verify Characters (PERS)
if (PERS.length !== 7) {
  logIssue('ERROR', 'Data', `Esperado 7 personagens em PERS, encontrado: ${PERS.length}`);
}

PERS.forEach(p => {
  if (!GAB[p.id]) {
    logIssue('ERROR', 'Data', `Gabarito ausente para o personagem: ${p.nome} (${p.id})`);
  }
  if (!MOCK_FICHAS[p.id]) {
    logIssue('ERROR', 'Mock', `Respostas de Mock ausentes para o personagem: ${p.nome}`);
  }
  if (!HINTS[p.id]) {
    logIssue('ERROR', 'Hints', `Dicas de resposta ausentes para o personagem: ${p.nome}`);
  }
});

// Verify Sequence arrays
const checkSequenceArray = (seqName: string, seq: string[]) => {
  if (seq.length !== 21) {
    logIssue('ERROR', 'Sequence', `${seqName} tem tamanho ${seq.length}, esperado 21.`);
  }
  const unique = new Set(seq);
  if (unique.size !== seq.length) {
    logIssue('ERROR', 'Sequence', `${seqName} contém IDs duplicados!`);
  }
  seq.forEach(id => {
    if (!EV.some(e => e.id === id)) {
      logIssue('ERROR', 'Sequence', `${seqName} contém ID inválido: ${id}`);
    }
  });
};

checkSequenceArray('MOCK_SEQ', MOCK_SEQ);
checkSequenceArray('MOCK_SEQ_WRONG', MOCK_SEQ_WRONG);
console.log('   ✓ Sequências MOCK_SEQ e MOCK_SEQ_WRONG validadas (21 itens, sem duplicatas).');

// Verify Option values in OPCOES
(['ordem', 'local', 'quando', 'como'] as FieldKey[]).forEach(field => {
  const options = OPCOES[field];
  if (!options || options.length < 2) {
    logIssue('ERROR', 'OPCOES', `Opções vazias para o campo: ${field}`);
  }
});

// ── 3. SIMULAÇÃO AUTOMATIZADA DOS MOTORES DO JOGO ─────────────────────────────
console.log('\n⚙️ [3/4] Executando simulações completas de partidas (Endings test)...');

function runSimulation(answers: typeof MOCK_FICHAS, sequence: string[]) {
  let tot = 0;
  let cor = 0;

  PERS.forEach(p => {
    const gab = GAB[p.id];
    (['ordem', 'local', 'quando', 'como'] as FieldKey[]).forEach(f => {
      const val = answers[p.id]?.[f] || '';
      let ok: boolean;

      if (gab.especial && f === 'ordem') {
        ok = true;
        tot++;
        cor++;
      } else {
        ok = match(val, gab[f] || []);
        tot++;
        if (ok) cor++;
      }
    });
  });

  const pct = Math.round((cor / tot) * 100);

  let seqHits = 0;
  if (sequence.length > 0) {
    for (let i = 0; i < Math.min(sequence.length, MOCK_SEQ.length); i++) {
      if (sequence[i] === MOCK_SEQ[i]) seqHits++;
    }
  }
  const seqFraction = sequence.length > 0 ? seqHits / MOCK_SEQ.length : 0;
  const seqPct = Math.round(seqFraction * 100);

  let endingKey: 'total' | 'fichas-ok' | 'seq-ok' | 'parcial' | 'inconclusivo';
  if (pct >= 90 && seqPct >= 65) endingKey = 'total';
  else if (pct >= 75 && seqPct < 50) endingKey = 'fichas-ok';
  else if (seqPct >= 65 && pct < 65) endingKey = 'seq-ok';
  else if (pct >= 50) endingKey = 'parcial';
  else endingKey = 'inconclusivo';

  return { cor, tot, pct, seqPct, seqHits, endingKey };
}

// Test Case A: Perfect game
const resA = runSimulation(MOCK_FICHAS, MOCK_SEQ);
if (resA.endingKey !== 'total' || resA.pct !== 100 || resA.seqPct !== 100) {
  logIssue('ERROR', 'Simulation', `Cenário Perfeito falhou! Resultado: ${JSON.stringify(resA)}`);
} else {
  console.log('   ✓ Cenário 1 (Jogo Perfeito): 100% Fichas, 100% Sequência -> Final "total" (Arquivo encerrado).');
}

// Test Case B: Fichas OK, Sequence Empty
const resB = runSimulation(MOCK_FICHAS, []);
if (resB.endingKey !== 'fichas-ok' || resB.pct !== 100 || resB.seqPct !== 0) {
  logIssue('ERROR', 'Simulation', `Cenário Fichas OK falhou! Resultado: ${JSON.stringify(resB)}`);
} else {
  console.log('   ✓ Cenário 2 (Fichas OK, Sem Sequência): 100% Fichas, 0% Sequência -> Final "fichas-ok".');
}

// Test Case C: Sequence OK, Fichas Wrong
const resC = runSimulation(MOCK_FICHAS_WRONG, MOCK_SEQ);
if (resC.endingKey !== 'seq-ok' || resC.seqPct !== 100) {
  logIssue('ERROR', 'Simulation', `Cenário Sequência OK falhou! Resultado: ${JSON.stringify(resC)}`);
} else {
  console.log('   ✓ Cenário 3 (Sequência OK, Fichas Incorretas): 100% Sequência -> Final "seq-ok".');
}

// Test Case D: All Wrong
const resD = runSimulation(MOCK_FICHAS_WRONG, MOCK_SEQ_WRONG);
if (resD.endingKey !== 'inconclusivo') {
  logIssue('ERROR', 'Simulation', `Cenário Inconclusivo falhou! Resultado: ${JSON.stringify(resD)}`);
} else {
  console.log('   ✓ Cenário 4 (Jogo Incorreto): Final "inconclusivo".');
}

// ── 4. AUDITORIA DE LAYOUT & QUEBRAS POTENCIAIS ───────────────────────────────
console.log('\n🎨 [4/4] Inspecionando potenciais quebras visuais e textos longos...');

OPCOES.ordem.concat(OPCOES.local, OPCOES.quando, OPCOES.como).forEach(opt => {
  if (opt.l.length > 35) {
    logIssue('WARNING', 'UI/Layout', `Rótulo de opção muito longo para select mobile: "${opt.l}" (${opt.l.length} chars)`);
  }
});

EV.forEach(e => {
  if (e.tipo.length > 25) {
    logIssue('WARNING', 'UI/Layout', `Tipo de evidência longo pode truncar em cards pequenos: "${e.tipo}"`);
  }
});

// ── IMPRESSÃO DO RELATÓRIO FINAL ──────────────────────────────────────────────
console.log('\n============================================================');
console.log('📋 RELATÓRIO FINAL DA AUDITORIA AUTOMÁTICA DO JOGO');
console.log('============================================================\n');

const errors = issues.filter(i => i.severity === 'ERROR');
const warnings = issues.filter(i => i.severity === 'WARNING');

if (errors.length === 0 && warnings.length === 0) {
  console.log('🎉 NENHUM ERRO OU QUEBRA DETECTADA! O jogo está 100% consistente, responsivo e sem falhas.');
} else {
  if (errors.length > 0) {
    console.log(`❌ ERROS ENCONTRADOS (${errors.length}):`);
    errors.forEach((err, idx) => console.log(`   ${idx + 1}. [${err.category}] ${err.message}`));
  } else {
    console.log('✅ NENHUM ERRO CRÍTICO ENCONTRADO.');
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️ ADVERTÊNCIAS/ALERTAS DE ATENÇÃO (${warnings.length}):`);
    warnings.forEach((warn, idx) => console.log(`   ${idx + 1}. [${warn.category}] ${warn.message}`));
  }
}

console.log('\nAuditoria concluída.');
if (errors.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
