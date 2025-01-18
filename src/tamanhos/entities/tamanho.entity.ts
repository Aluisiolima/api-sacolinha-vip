import { Produto } from "src/produtos/entities/produto.entity"
import { Venda } from "src/vendas/entities/venda.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("tamanhos")
export class Tamanho {

    @PrimaryGeneratedColumn({name:"id_tamanho"})
    id:number

    @ManyToOne(() => Produto, (produto) => produto.tamanhos)
    @JoinColumn({name:"id_produto"})
    produto:Produto 

    @Column({type:"varchar", length:5, nullable:false})
    tamanho:string

    @OneToMany(() => Venda, (venda) => venda.tamanho)
    venda:Venda[]
}
