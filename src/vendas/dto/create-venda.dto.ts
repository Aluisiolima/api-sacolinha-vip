import { IsInt, IsPositive, IsString, Length, Max, Min } from "class-validator";
import { Empresa } from "src/empresa/entities/empresa.entity";
import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Produto } from "src/produtos/entities/produto.entity";

export class CreateVendaDto {
    @IsInt()
    @IsPositive()
    produto: Produto

    @IsInt()
    @IsPositive()
    pedido: Pedido

    @IsInt()
    @IsPositive()
    @Min(0)
    @Max(100)
    desconto_aplicado: number

    @IsString()
    @Length(1,5)
    tamanho: string

    @IsInt()
    @IsPositive()
    quantidade: number

    @IsInt()
    @IsPositive()
    empresa: Empresa
}
