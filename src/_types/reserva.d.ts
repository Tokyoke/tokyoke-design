export type CreateReserva = {
  name: string;
  cpf: string;
  phone: string;
  date: string; // ISO date string
  time: string;
  guests: string;
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