type Categorie = {
  id: number;
  titulo: string;
  quantidade: number;
  itens?: Item[];
};

type CreateCategorie = {
  titulo: string;
};