import { IsInt, IsOptional, IsString } from 'class-validator';
import { Arquivo } from 'src/arquivos/entities/arquivo.entity';

export class UpdateEmpresaDto {
  @IsOptional()
  @IsString()
  nome: string | null;

  @IsOptional()
  @IsString()
  endereco: string | null;

  @IsOptional()
  @IsString()
  status: string | null;

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
}
