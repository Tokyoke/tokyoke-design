export type CreateReserva = {
  name: string;
  cpf: string;
  phone: string;
  date: string; // ISO date string
  time: string;
  guests: string;
};

export type ReservaCompleta = {
  idReserva: number;
  Data: string; // ISO DateTime string
  Qnt_de_pessoas: number;
  status: "pendente" | "confirmada" | "cancelada" | "concluida";
  cadastro: {
    Nome: string;
    Telefone: string;
  };
};

export type UpdateReserva = {
  status: "pendente" | "confirmada" | "cancelada" | "concluida";
};