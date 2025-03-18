import { IsInt, IsOptional, IsString } from 'class-validator';
import { Arquivo } from 'src/arquivos/entities/arquivo.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export class CreateEmpresaDto {
  @IsString()
  nome: string;

  @IsString()
  endereco: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsInt()
  arquivo: Arquivo | null;

  @IsOptional()
  @IsString()
  whatsapp: string | null;

  @IsOptional()
  @IsString()
  facebook: string | null;

  @IsOptional()
  @IsString()
  instagram: string | null;

  @IsOptional()
  @IsInt()
  usuario: Usuario | null;
}
