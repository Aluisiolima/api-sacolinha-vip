import { IsString, IsInt, IsOptional, IsDecimal, IsPositive, Max, Min } from "class-validator"

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
    @IsOptional()
    id_img?: number;
  
    @IsInt()
    @IsPositive()
    @IsOptional()
    id_categoria?: number;
}
