import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { DataSource, Repository } from 'typeorm';
import { VendasService } from 'src/vendas/vendas.service';


@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    private readonly vendaServices: VendasService,
    private dataSource: DataSource,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return await this.dataSource.transaction(async (manager) => {
      const pedido = await manager.save(Pedido, createPedidoDto);

      pedido.vendas.forEach(async (venda) => {
        venda.empresa = pedido.empresa
        venda.pedido = pedido

        await this.vendaServices.create(venda)
      })

      return pedido;
    });
  }

  findAll() {
    return `This action returns all pedidos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }
}
