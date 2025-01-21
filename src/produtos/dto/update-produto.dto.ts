import { IsString, IsInt, IsOptional, IsDecimal, IsPositive, Max, Min } from "class-validator"
import { Categoria } from "src/categorias/entities/categoria.entity";

export class UpdateProdutoDto {
    @IsString()
    @IsOptional()
    nome?: string;
  
    @IsDecimal()
    @IsPositive()
    @IsOptional()
    preco?: number;
  
    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    desconto?: number;
  
    @IsInt()
    @IsPositive()
    @IsOptional()
    estoque?: number;
  
    @IsInt()
    @IsPositive()
    @IsOptional()
    id_categoria?: Categoria;
}
