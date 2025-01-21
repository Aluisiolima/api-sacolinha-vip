import { Empresa } from "src/empresa/entities/empresa.entity";
import { Produto } from "src/produtos/entities/produto.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn, ManyToMany } from "typeorm";

@Entity("arquivos")
export class Arquivo {
    @PrimaryGeneratedColumn({ name: "id_arquivo" })
    id: number

    @Column({ type: "varchar", length: 20, nullable: false })
    tipo: string

    @Column({ type: "varchar", length: 200, nullable: false })
    path: string

    @Column({ type: "int", nullable: false })
    tamanho: number

    @OneToMany(() => Empresa, (empresa) => empresa.arquivos, { onDelete: "CASCADE", nullable:false })
    @JoinColumn({ name: "id_empresa" })
    id_empresa: Empresa[]

    @ManyToMany(() => Produto, (produto) => produto.id_img, { onDelete: "CASCADE", nullable:false })
    produto: Produto[]
}
