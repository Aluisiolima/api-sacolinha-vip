import { IsArray, IsInt, IsPositive, IsString } from "class-validator";
import { Arquivo } from "src/arquivos/entities/arquivo.entity";
import { Produto } from "src/produtos/entities/produto.entity";

export class CreateCategoriaDto {
    @IsString()
    categoria:string

    @IsInt()
    @IsPositive()
    img:Arquivo
}
