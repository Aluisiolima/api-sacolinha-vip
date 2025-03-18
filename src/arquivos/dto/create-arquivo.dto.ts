import { IsInt, IsPositive, IsString } from 'class-validator';
import { Empresa } from 'src/empresa/entities/empresa.entity';

export class CreateArquivoDto {
  @IsString()
  path: string;

  @IsString()
  tipo: string;

  @IsInt()
  @IsPositive()
  empresa: Empresa;
}
