import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post("inserir")
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get("pegar")
  findAll() {
    return this.categoriasService.findAll();
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
