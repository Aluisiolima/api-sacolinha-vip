import { Module } from '@nestjs/common';
import { TamanhosService } from './tamanhos.service';
import { TamanhosController } from './tamanhos.controller';

@Module({
  controllers: [TamanhosController],
  providers: [TamanhosService],
})
export class TamanhosModule {}
