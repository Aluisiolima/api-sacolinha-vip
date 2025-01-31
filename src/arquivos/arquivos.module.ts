import { Module } from '@nestjs/common';
import { ArquivosService } from './arquivos.service';
import { ArquivosController } from './arquivos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arquivo } from './entities/arquivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Arquivo])],
  controllers: [ArquivosController],
  providers: [ArquivosService],
})
export class ArquivosModule {}
