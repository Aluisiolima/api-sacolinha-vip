import { Empresa } from "src/empresa/entities/empresa.entity"
import { Pedido } from "src/pedidos/entities/pedido.entity"
import { Produto } from "src/produtos/entities/produto.entity"
import { Tamanho } from "src/tamanhos/entities/tamanho.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("vendas")
export class Venda {
    @PrimaryGeneratedColumn({ name: "id_venda" })
    id: number

    @ManyToOne(() => Produto, (produto) => produto.venda, { onDelete: "RESTRICT", nullable:false })
    @JoinColumn({ name: "id_produto" })
    id_produto: Produto

    @ManyToOne(() => Pedido, (pedido) => pedido.venda, { onDelete: "RESTRICT", nullable:false })
    @JoinColumn({ name: "id_pedido" })
    id_pedido: Pedido

    @Column({ type: "int", nullable: false })
    desconto_aplicado: number

    @ManyToOne(() => Tamanho, (tamanho) => tamanho.venda, { onDelete: "NO ACTION", nullable:false })
    @JoinColumn({ name: "id_tamanho" })
    id_tamanho: Tamanho

    @Column({ type: "int", nullable: false })
    quantidade: number

    @ManyToOne(() => Empresa, (empresa) => empresa.id_venda, { onDelete: "CASCADE", nullable:false })
    @JoinColumn({ name: "id_empresa" })
    id_empresa: Empresa
}
