export type CreateReserva = {
  cpf: string;
  date: string; // ISO date string
  time: string;
  guests: number;
};

export type ReservaBackend = {
  id: number;
  data: string;
  cpf: string;
  qnt_pessoas: number;
  status: "APROVADO" | "REPROVADO" | "PENDENTE";
};

export type UpdateReserva = {
  status: "APROVADO" | "REPROVADO" | "PENDENTE";
};