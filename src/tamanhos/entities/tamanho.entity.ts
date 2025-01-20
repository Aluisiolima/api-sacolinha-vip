import { Produto } from "src/produtos/entities/produto.entity"
import { Venda } from "src/vendas/entities/venda.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("tamanhos")
export class Tamanho {

    @PrimaryGeneratedColumn({ name: "id_tamanho" })
    id: number

    @ManyToOne(() => Produto, (produto) => produto.id_tamanho, {onDelete:"CASCADE", nullable:false})
    @JoinColumn({ name: "id_produto" })
    id_produto: Produto

    @Column({ type: "varchar", length: 5, nullable: false })
    tamanho: string

    @OneToMany(() => Venda, (venda) => venda.id_tamanho, {onDelete:"CASCADE", nullable:false})
    venda: Venda[]
}
