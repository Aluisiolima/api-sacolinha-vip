import { Module } from '@nestjs/common';
import { TamanhosService } from './tamanhos.service';
import { TamanhosController } from './tamanhos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tamanho } from './entities/tamanho.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tamanho])],
  controllers: [TamanhosController],
  providers: [TamanhosService],
})
export class TamanhosModule {}
