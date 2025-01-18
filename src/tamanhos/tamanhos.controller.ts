import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TamanhosService } from './tamanhos.service';
import { CreateTamanhoDto } from './dto/create-tamanho.dto';
import { UpdateTamanhoDto } from './dto/update-tamanho.dto';

@Controller('tamanhos')
export class TamanhosController {
  constructor(private readonly tamanhosService: TamanhosService) {}

  @Post()
  create(@Body() createTamanhoDto: CreateTamanhoDto) {
    return this.tamanhosService.create(createTamanhoDto);
  }

  @Get()
  findAll() {
    return this.tamanhosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tamanhosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTamanhoDto: UpdateTamanhoDto) {
    return this.tamanhosService.update(+id, updateTamanhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tamanhosService.remove(+id);
  }
}
