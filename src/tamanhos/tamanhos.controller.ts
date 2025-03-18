import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TamanhosService } from './tamanhos.service';
import { CreateTamanhoDto } from './dto/create-tamanho.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tamanhos')
export class TamanhosController {
  constructor(private readonly tamanhosService: TamanhosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('inserir')
  create(@Body() createTamanhoDto: CreateTamanhoDto, @Req() req: any) {
    return this.tamanhosService.create(createTamanhoDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.tamanhosService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.tamanhosService.remove(+id, req.user);
  }
}
