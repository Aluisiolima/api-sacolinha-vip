import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Produto } from "src/produtos/entities/produto.entity";
import { Arquivo } from "src/arquivos/entities/arquivo.entity";
import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Venda } from "src/vendas/entities/venda.entity";

@Entity("empresa")
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  nome: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  endereco: string;

  @Column({ type: "varchar", length: 10, nullable: false })
  status: string;

  @OneToOne(() => Arquivo, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "logo_img" })
  arquivo: Arquivo | null;

  @Column({ type: "varchar", length: 20, nullable: true, default: null })
  whatsapp: string | null;

  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  facebook: string | null;

  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  instagram: string | null;

  @OneToOne(() => Usuario, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "proprietario" })
  usuario: Usuario | null;

  @OneToMany(() => Produto, (produto) => produto.empresa, { onDelete: "CASCADE", nullable: false })
  produtos: Produto[]

  @OneToMany(() => Arquivo, (arquivo) => arquivo.empresa, { onDelete: "CASCADE", nullable: false })
  arquivos: Arquivo[]

  @OneToMany(() => Pedido, (pedido) => pedido.empresa, { onDelete: "CASCADE", nullable: false })
  pedidos: Pedido[]

  @OneToMany(() => Usuario, (usuario) => usuario.empresa, { onDelete: "CASCADE", nullable: false })
  usuarios: Usuario[]

  @OneToMany(() => Venda, (venda) => venda.empresa, { onDelete: "CASCADE", nullable: false })
  vendas: Venda[]
}
