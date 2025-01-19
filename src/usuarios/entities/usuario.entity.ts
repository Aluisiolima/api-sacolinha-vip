import { Empresa } from "src/empresa/entities/empresa.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("usuarios")
export class Usuario {
    @PrimaryGeneratedColumn({ name:"id_usuario" })
    id:number

    @Column({type:"varchar", length:100, nullable:false})
    nome:string

    @Column({type:"varchar", length:200, nullable:false})
    senha:string

    @Column({type:"varchar", length:20, nullable:false})
    cargo:string

    @ManyToOne(() => Empresa, (empresa) => empresa.usuarios, {onDelete:"CASCADE"})
    @JoinColumn({ name:"id_empresa"} )
    empresa:Empresa[]
}
