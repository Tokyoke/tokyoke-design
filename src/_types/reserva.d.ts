type Reserva = {
  cpf: string;
  data: string;
  id: number;
  qnt_pessoas: number;
  status: "APROVADO" | "REPROVADO" | "PENDENTE";
};
