import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateTamanhoDto {
  @IsString()
  @Length(1, 5)
  @Transform(({ value }) => value.toUpperCase())
  tamanho: string;
}
