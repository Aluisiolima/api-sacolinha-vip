import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('dono')
  inserirChefe(@Body() date: { empresa: number; user: number }) {
    return this.empresaService.InserirProprietario(date);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('logo')
  inserirLogo(@Body() date: { empresa: number; arquivo: number }) {
    return this.empresaService.InserirImgLogo(date);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(+id, updateEmpresaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(+id);
  }
}
