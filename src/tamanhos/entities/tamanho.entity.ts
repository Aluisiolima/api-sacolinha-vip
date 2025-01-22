import { Produto } from "src/produtos/entities/produto.entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("tamanhos")
export class Tamanho {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 5, nullable: false })
    tamanho: string

    @ManyToMany(() => Produto, (produto) => produto.tamanhos, { onDelete: "CASCADE", nullable: false })
    produto: Produto[]

}
