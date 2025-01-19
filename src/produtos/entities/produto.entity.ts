import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { Empresa } from "src/empresa/entities/empresa.entity";
import { Arquivo } from "src/arquivos/entities/arquivo.entity";
import { Tamanho } from "src/tamanhos/entities/tamanho.entity";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { Venda } from "src/vendas/entities/venda.entity";

@Entity("produtos") 
export class Produto {

  @PrimaryGeneratedColumn({ name: "id_produto" })
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  nome: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  preco: number;

  @Column({ type: "int", nullable: false, comment: "Deve ser um número entre 0 e 100" })
  desconto: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.produtos ,{ onDelete: "CASCADE" })
  @JoinColumn({ name: "id_empresa" })
  empresa: Empresa;

  @Column({ type: "int", nullable: false })
  estoque: number;

  @OneToOne(() => Arquivo, (arquivo) => arquivo.produto, {onDelete:"CASCADE"})
  @JoinColumn({ name: "id_img" })
  arquivo: Arquivo;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {onDelete:"CASCADE"})
  @JoinColumn({ name: "id_categoria" })
  categoria: Categoria;

  @OneToOne(() => Tamanho, (tamanho) => tamanho.produto)
  tamanhos:Tamanho[]

  @OneToMany(() => Venda, (venda) => venda.produto)
  venda:Venda[]
}
