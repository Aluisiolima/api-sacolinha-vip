import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Arquivo } from 'src/arquivos/entities/arquivo.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, Arquivo, Usuario])],
  controllers: [EmpresaController],
  providers: [EmpresaService],
})
export class EmpresaModule {}
