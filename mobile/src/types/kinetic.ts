export type Usuario = {
  id: string;
  nome: string;
  email: string;
  condicoes?: string[];
  acessibilidade?: string[];
  consentimentoTela?: boolean;
};
export type Atividade = {
  _id: string;
  tipo: string;
  duracaoMin: number;
  data: string;
  intensidade?: string;
  observacoes?: string;
};
export type Meta = {
  _id: string;
  titulo: string;
  alvo: number;
  atual: number;
  unidade: string;
};
export type Rotina = {
  _id: string;
  nome: string;
  frequencia: string[];
  itens: { nome: string; duracaoMin?: number; horario?: string }[];
};
export type Resumo = {
  minutosHoje: number;
  metaMinutos: number;
  percentual: number;
  pausas: number;
  pausasMeta: number;
  metas: Meta[];
};
export type Lembrete = {
  _id: string;
  titulo: string;
  horario: string;
  tipo: string;
  ativo: boolean;
};
