import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get("pegarAll/:id")
  findAll(@Param('id') id:number) {
    return this.pedidosService.findAll(id);
  }

  @Get('pegar/:id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

}
