import { Produto } from "src/produtos/entities/produto.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("categorias")
export class Categoria {

    @PrimaryGeneratedColumn({name:"id_categoria"})
    id:number

    @Column({type:"varchar", length:100, nullable:false})
    categoria:string

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto:Produto[]
}
