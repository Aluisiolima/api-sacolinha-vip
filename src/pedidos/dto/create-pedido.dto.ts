import { IsInt, IsPositive, IsString } from 'class-validator';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Produto } from 'src/produtos/entities/produto.entity';

interface produto {
  produto: Produto;
  desconto_aplicado: number;
  tamanho: string;
  quantidade: number;
}

export class CreatePedidoDto {
  @IsString()
  nome: string;

  @IsString()
  numero_contato: string;

  @IsString()
  forma_pagamento: string;

  @IsString()
  tipo_entrega: string;

  @IsInt()
  @IsPositive()
  empresa: Empresa;

  vendas: produto[];
}
