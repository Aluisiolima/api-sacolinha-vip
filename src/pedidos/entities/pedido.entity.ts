import { Empresa } from "src/empresa/entities/empresa.entity"
import { Venda } from "src/vendas/entities/venda.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("pedidos")
export class Pedido {

    @PrimaryGeneratedColumn({ name: "id_pedido" })
    id: number

    @Column({ name: "nome_cliente", type: "varchar", length: 100, nullable: false })
    nome: string

    @Column({ type: "varchar", length: 200, nullable: true })
    endereco: string | null

    @Column({ type: "varchar", length: 20, nullable: false })
    numero_contato: string

    @Column({ type: "varchar", length: 20, nullable: false })
    status: string

    @ManyToOne(() => Empresa, (empresa) => empresa.pedidos, { onDelete: "CASCADE" })
    @JoinColumn({ name: "id_empresa" })
    empresa: Empresa

    @OneToMany(() => Venda, (venda) => venda.pedido)
    venda: Venda[]
}
