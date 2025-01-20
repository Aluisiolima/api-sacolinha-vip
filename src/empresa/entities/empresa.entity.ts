import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
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

  @Column({ type: "varchar", length: 10, nullable: false, default:"ativa" })
  status: string;

  @OneToOne(() => Arquivo, {onDelete:"SET NULL", nullable: true })
  @JoinColumn({ name: "id_img" })
  id_img: Arquivo | null;

  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  whatsapp: string | null;

  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  facebook: string | null;

  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  instagram: string | null;

  @OneToOne(() => Usuario, {onDelete:"SET NULL", nullable: true })
  @JoinColumn({ name: "proprietario" })
  proprietario: Usuario | null;

  @OneToMany(() => Produto, (produto) => produto.id_empresa, { onDelete:"CASCADE", nullable:false})
  produtos: Produto[]

  @OneToMany(() => Arquivo, (arquivo) => arquivo.id_empresa, { onDelete:"CASCADE", nullable:false})
  arquivos: Arquivo[]

  @OneToMany(() => Pedido, (pedido) => pedido.id_empresa, { onDelete:"CASCADE", nullable:false})
  id_pedido: Pedido[]

  @OneToMany(() => Usuario, (usuario) => usuario.id_empresa, { onDelete:"CASCADE", nullable:false})
  id_usuario: Usuario[]

  @OneToMany(() => Venda, (venda) => venda.id_empresa, { onDelete:"CASCADE", nullable:false})
  id_venda: Venda[]
}
