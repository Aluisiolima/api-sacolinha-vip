import { Controller, Get, Param } from '@nestjs/common';
import { VendasService } from './vendas.service';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Get(":id")
  findAll(@Param("id") id:number) {
    return this.vendasService.findAll(id);
  }
}
