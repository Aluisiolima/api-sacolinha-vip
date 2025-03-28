import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Arquivo } from 'src/arquivos/entities/arquivo.entity';
import { Tamanho } from 'src/tamanhos/entities/tamanho.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Venda } from 'src/vendas/entities/venda.entity';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'Deve ser um número entre 0 e 100',
  })
  desconto: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.produtos, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @Column({ type: 'int', nullable: false })
  estoque: number;

  @ManyToMany(() => Arquivo, (arquivo) => arquivo.produtos, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinTable({ name: 'galeria' })
  arquivos: Arquivo[];

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @ManyToMany(() => Tamanho, (tamanho) => tamanho.produto, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinTable({ name: 'tamanhos_produtos' })
  tamanhos: Tamanho[];

  @OneToMany(() => Venda, (venda) => venda.produto, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  vendas: Venda[];

  constructor(Produto?: Partial<Produto>){
    this.arquivos = Produto?.arquivos;
    this.categoria = Produto?.categoria;
    this.desconto = Produto?.desconto;
    this.empresa = Produto?.empresa;
    this.estoque = Produto?.estoque;
    this.id = Produto?.id;
    this.nome = Produto?.nome;
    this.tamanhos = Produto?.tamanhos;
    this.valor = Produto?.valor;
    this.valor = Produto?.valor;
  }
}
