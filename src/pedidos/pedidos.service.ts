import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Venda } from 'src/vendas/entities/venda.entity';


@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    private dataSource: DataSource,
  ) { }

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return await this.dataSource.transaction(async (manager: EntityManager) => {
      const pedido = await manager.save(Pedido, createPedidoDto);

      for (const venda of pedido.vendas) {
        await manager.save(Venda, {
          "produto": venda.produto,
          "pedido": pedido,
          "desconto_aplicado": venda.desconto_aplicado,
          "tamanho": venda.tamanho,
          "quantidade": venda.quantidade,
          "empresa": pedido.empresa
        });
      }

      return pedido;
    });
  }

  async findAll(idEmpresa: number): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      where: { empresa: { id: idEmpresa } },
      relations: ["vendas"]
    });
  }

  async findOne(id: number): Promise<Pedido> {
    return await this.pedidoRepository.findOne({
      where: { id: id }
    });
  }
}
