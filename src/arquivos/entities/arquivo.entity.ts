import { Empresa } from "src/empresa/entities/empresa.entity";
import { Produto } from "src/produtos/entities/produto.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, OneToOne } from "typeorm";

@Entity("arquivos")
export class Arquivo {
    @PrimaryGeneratedColumn({ name:"id_arquivo" })
    id:number

    @Column({type:"varchar", length:20, nullable:false})
    tipo:string

    @Column({type:"varchar", length:200, nullable:false})
    path:string

    @Column({type:"int", nullable:false})
    tamanho:number

    @ManyToOne(() => Empresa, (empresa) => empresa.arquivos, {onDelete:"CASCADE"})
    @JoinColumn({ name: "id_empresa" })
    empresa:Empresa

    @OneToOne(() => Produto, (produto) => produto.arquivo)
    produto:Produto
}
