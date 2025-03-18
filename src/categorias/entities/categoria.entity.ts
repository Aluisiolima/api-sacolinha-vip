import { Arquivo } from 'src/arquivos/entities/arquivo.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  categoria: string;

  @OneToOne(() => Arquivo, (arquivo) => arquivo.categoria, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_img' })
  img: Arquivo;

  @OneToMany(() => Produto, (produto) => produto.categoria, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  produtos: Produto[];
}
