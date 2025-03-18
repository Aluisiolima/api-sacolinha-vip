import { IsInt, IsPositive, IsString } from 'class-validator';
import { Arquivo } from 'src/arquivos/entities/arquivo.entity';

export class CreateCategoriaDto {
  @IsString()
  categoria: string;

  @IsInt()
  @IsPositive()
  img: Arquivo;
}
