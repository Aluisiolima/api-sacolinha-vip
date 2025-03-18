import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('pegarAll/:id')
  findAll(@Param('id') id: number) {
    return this.pedidosService.findAll(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('pegar/:id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }
}
