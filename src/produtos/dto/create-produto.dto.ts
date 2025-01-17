import { IsString, IsInt, IsOptional, IsDecimal, IsPositive, Max, Min, IsNotEmpty } from "class-validator"

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
    id_empresa: number;
    
    @IsInt()
    @IsPositive()
    estoque: number;
    
    @IsInt()
    @IsPositive()
    id_img: number;
    
    @IsInt()
    @IsPositive()
    id_categoria: number;
}
