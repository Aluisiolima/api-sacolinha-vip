import { Empresa } from "src/empresa/entities/empresa.entity"
import { Pedido } from "src/pedidos/entities/pedido.entity"
import { Produto } from "src/produtos/entities/produto.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("vendas")
export class Venda {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Produto, (produto) => produto.vendas, { onDelete: "RESTRICT", nullable: false })
    @JoinColumn({ name: "id_produto" })
    produto: Produto

    @ManyToOne(() => Pedido, (pedido) => pedido.vendas, { onDelete: "RESTRICT", nullable: false })
    @JoinColumn({ name: "id_pedido" })
    pedido: Pedido

    @Column({ type: "int", nullable: false })
    desconto_aplicado: number

    @Column({ type: "varchar", length: 5, nullable: false })
    tamanho: string

    @Column({ type: "int", nullable: false })
    quantidade: number

    @ManyToOne(() => Empresa, (empresa) => empresa.vendas, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "id_empresa" })
    empresa: Empresa
}
