export interface Evidence {
  id: string;
  tipo: string;
  desc: string;
}

export interface Character {
  id: string;
  nome: string;
  cor: string;
  idade: number;
}

export type FieldKey = 'ordem' | 'local' | 'quando' | 'como';

export interface CharacterAnswers {
  ordem?: string;
  local?: string;
  quando?: string;
  como?: string;
}

export type AllAnswers = Record<string, CharacterAnswers>;

export interface FieldOption {
  v: string;
  l: string;
}

export interface VerificationFieldResult {
  label: string;
  val: string;
  ok: boolean;
  cls: 'ok' | 'err' | 'amb';
  hint: string;
}

export interface CharacterVerificationResult {
  p: Character;
  campos: VerificationFieldResult[];
  especial?: boolean;
}

export interface FinalVerificationResult {
  scoreCor: number;
  scoreTot: number;
  pct: number;
  seqPct: number;
  seqHits: number;
  endingKey: 'total' | 'fichas-ok' | 'seq-ok' | 'parcial' | 'inconclusivo';
  stamp: string;
  color: string;
  info: string;
  details: CharacterVerificationResult[];
}
