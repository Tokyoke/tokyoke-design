export type SignUpData = {
  cpf: string;
  email: string;
  nome: string;
  role: "USER" | "ADMIN";
  senha: string;
  telefone: number;
};

export type BackendUser = {
  idCadastro: number;
  CPF: string;
  Nome: string;
  Senha: string;
  Telefone: number;
  Email: string;
  Role: "USER" | "ADMIN";
};
