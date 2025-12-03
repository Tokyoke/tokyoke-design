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
  cpf: string;
  nome: string;
  senha: string;
  telefone: number;
  email: string;
  role: "USER" | "ADMIN";
};

export type UpdateCadastroData = Partial<Omit<BackendUser, "idCadastro">>;
