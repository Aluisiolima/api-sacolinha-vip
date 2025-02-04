import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { VendasModule } from 'src/vendas/vendas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido]), VendasModule],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
