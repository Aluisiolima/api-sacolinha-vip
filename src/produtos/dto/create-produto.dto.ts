import { IsString, IsInt, IsDecimal, IsPositive, Max, Min, IsNotEmpty } from "class-validator"
import { Categoria } from "src/categorias/entities/categoria.entity";
import { Empresa } from "src/empresa/entities/empresa.entity";

export class CreateProdutoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;
    
    @IsDecimal()
    @IsPositive()
    preco: number;
    
    @IsInt()
    @Max(100)
    @Min(0)
    desconto: number;

    @IsInt()
    @IsPositive()
    id_empresa: Empresa;
    
    @IsInt()
    @IsPositive()
    estoque: number;

    
    @IsInt()
    @IsPositive()
    id_categoria: Categoria;

}
