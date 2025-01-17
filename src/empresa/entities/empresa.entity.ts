import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Produto } from "src/produtos/entities/produto.entity";
import { Arquivo } from "src/arquivos/entities/arquivo.entity";

@Entity("empresa")
export class Empresa {
  @PrimaryGeneratedColumn({ name: "id_empresa" })
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  nome: string;

 @OneToOne(() => Arquivo, {nullable:true})
 @JoinColumn()
  id_img: Arquivo | null;

  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  whatsapp: string | null;

  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  facebook: string | null;

  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  instagram: string | null;

  @Column({ type: "int", nullable: true, default: null })
  proprietario: number | null;

  @OneToMany(() => Produto, (produto) => produto.empresa)
  produtos:Produto[]

  @OneToMany(() => Arquivo, (arquivo) => arquivo.empresa)
  arquivos:Arquivo[]
}
