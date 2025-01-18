import { Empresa } from "src/empresa/entities/empresa.entity"
import { Pedido } from "src/pedidos/entities/pedido.entity"
import { Produto } from "src/produtos/entities/produto.entity"
import { Tamanho } from "src/tamanhos/entities/tamanho.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("vendas")
export class Venda {
    @PrimaryGeneratedColumn({ name:"id_venda" })
    id:number

    @ManyToOne(() => Produto, (produto) => produto.venda)
    @JoinColumn({ name:"id_produto" })
    produto:Produto

    @ManyToOne(() => Pedido, (pedido) => pedido.venda)
    @JoinColumn({ name:"id_pedido" })
    pedido:Pedido

    @Column({type:"int", nullable:false})
    desconto_aplicado:number

    @ManyToOne(() => Tamanho, (tamanho) => tamanho.venda)
    @JoinColumn({ name:"id_tamanho" })
    tamanho:Tamanho

    @Column({type:"int", nullable:false})
    quantidade:number

    @ManyToOne(() => Empresa, (empresa) => empresa.venda)
    @JoinColumn({ name:"id_empresa" })
    empresa:Empresa
}
