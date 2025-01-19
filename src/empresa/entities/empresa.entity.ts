import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Produto } from "src/produtos/entities/produto.entity";
import { Arquivo } from "src/arquivos/entities/arquivo.entity";
import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Venda } from "src/vendas/entities/venda.entity";

@Entity("empresa")
export class Empresa {
  @PrimaryGeneratedColumn({ name: "id_empresa" })
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  nome: string;

  @OneToOne(() => Arquivo, {nullable:true})
  @JoinColumn({ name:"id_img" })
  id_img: Arquivo | null;

  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  whatsapp: string | null;

  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  facebook: string | null;

  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  instagram: string | null;

  @OneToOne(() => Usuario, {nullable:true})
  @JoinColumn({ name:"proprietario" })
  proprietario: Usuario | null;

  @OneToMany(() => Produto, (produto) => produto.empresa)
  produtos:Produto[]

  @OneToMany(() => Arquivo, (arquivo) => arquivo.empresa)
  arquivos:Arquivo[]

  @OneToMany(() => Pedido, (pedido) => pedido.empresa)
  pedidos:Pedido[]

  @OneToMany(() => Usuario, (usuarios) => usuarios.empresa)
  usuarios:Usuario[]

  @OneToMany(() => Venda, (venda) => venda.empresa)
  venda:Venda[]
}
