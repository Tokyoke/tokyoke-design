// class Item(Base):
//     __tablename__ = 'item'

//     idItem = Column(Integer, primary_key=True, autoincrement=True)
//     Nome = Column(String(45))
//     Valor = Column(Float)
//     Descricao = Column(String(99))
    
//     # Chaves Estrangeiras
//     Categoria_idCategoria = Column(Integer, ForeignKey('categoria.idCategoria'), nullable=False)

//     # Relacionamento
//     categoria = relationship("Categoria", back_populates="itens")

export type Item = {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
};

export type CreateItem = {
  Nome: string;
  Valor: number;
  Descricao: string;
  Categoria_idCategoria: number;
};

export type UpdateItem = Partial<CreateItem>;