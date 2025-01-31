import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { TamanhosService } from "./tamanhos.service";
import { CreateTamanhoDto } from "./dto/create-tamanho.dto";

@Controller("tamanhos")
export class TamanhosController {
  constructor(private readonly tamanhosService: TamanhosService) { }

  @Post("inserir")
  create(@Body() createTamanhoDto: CreateTamanhoDto) {
    return this.tamanhosService.create(createTamanhoDto);
  }

  @Get()
  findAll() {
    return this.tamanhosService.findAll();
  }

  @Delete("remove/:id")
  remove(@Param("id") id: string) {
    return this.tamanhosService.remove(+id);
  }
}
