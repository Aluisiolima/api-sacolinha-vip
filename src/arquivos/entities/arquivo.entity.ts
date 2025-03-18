import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity('arquivos')
export class Arquivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  tipo: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  path: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.arquivos, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @OneToOne(() => Categoria, (categoria) => categoria.img, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  categoria: Categoria;

  @ManyToMany(() => Produto, (produto) => produto.arquivos, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  produtos: Produto[];
}
