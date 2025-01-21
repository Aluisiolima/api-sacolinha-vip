import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Index, JoinTable, ManyToMany } from "typeorm";
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

  @Index()
  @ManyToOne(() => Empresa, (empresa) => empresa.produtos, { onDelete: "CASCADE" , nullable:false})
  @JoinColumn({ name: "id_empresa" })
  id_empresa: Empresa;

  @Column({ type: "int", nullable: false })
  estoque: number;

  @ManyToMany(() => Arquivo, (arquivo) => arquivo.produto, { onDelete: "RESTRICT", nullable:false })
  @JoinTable()
  id_img: Arquivo[];

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, { onDelete: "CASCADE", nullable:false })
  @JoinColumn({ name: "id_categoria" })
  id_categoria: Categoria;

  @OneToMany(() => Tamanho, (tamanho) => tamanho.id_produto, { onDelete: "RESTRICT", nullable:false })
  id_tamanho: Tamanho[]

  @OneToMany(() => Venda, (venda) => venda.id_produto, { onDelete: "RESTRICT", nullable:false })
  venda: Venda[]
}
