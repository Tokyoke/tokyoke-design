export type SignUpData = {
  cpf: string;
  email: string;
  nome: string;
  role: "USER" | "ADMIN";
  senha: string;
  telefone: number;
};
