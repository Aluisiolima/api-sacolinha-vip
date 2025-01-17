import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Empresa } from "src/empresa/entities/empresa.entity";

@Entity("produtos") 
export class Produto {
  @PrimaryGeneratedColumn({ name: "id_produto" })
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
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

  @Column({ type: "int", nullable: false })
  id_img: number;

  @Column({ type: "int", nullable: false })
  id_categoria: number;
}
