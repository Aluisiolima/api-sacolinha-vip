import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Arquivo } from 'src/arquivos/entities/arquivo.entity';
import { Tamanho } from 'src/tamanhos/entities/tamanho.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto,Arquivo,Tamanho])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}
