import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { TamanhosService } from "./tamanhos.service";
import { CreateTamanhoDto } from "./dto/create-tamanho.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("tamanhos")
export class TamanhosController {
  constructor(private readonly tamanhosService: TamanhosService) { }

  @UseGuards(AuthGuard("jwt"))
  @Post("inserir")
  create(@Body() createTamanhoDto: CreateTamanhoDto) {
    return this.tamanhosService.create(createTamanhoDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll() {
    return this.tamanhosService.findAll();
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("remove/:id")
  remove(@Param("id") id: string) {
    return this.tamanhosService.remove(+id);
  }
}
