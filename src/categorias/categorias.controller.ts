import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("inserir")
  create(@Body() createCategoriaDto: CreateCategoriaDto, @Req() req: any) {
    return this.categoriasService.create(createCategoriaDto, req.user);
  }

  @Get("pegar")
  findAll() {
    return this.categoriasService.findAll();
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete('remove/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.categoriasService.remove(+id, req.user);
  }
}
