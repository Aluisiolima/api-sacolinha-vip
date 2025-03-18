import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findAll(@Param('id') id: number) {
    return this.vendasService.findAll(id);
  }
}
