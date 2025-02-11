import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("inserir")
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get("pegar")
  findAll() {
    return this.categoriasService.findAll();
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
