import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";
import { CreateProdutoDto } from "./dto/create-produto.dto";
import { UpdateProdutoDto } from "./dto/update-produto.dto";

@Controller("produtos")
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post("inserir")
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get("pegarAll")
  findAll() {
    return this.produtosService.findAll();
  }

  @Get("pegar/:id")
  findOne(@Param("id") id: string) {
    return this.produtosService.findOne(+id);
  }

  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete("remove/:id")
  remove(@Param("id") id: string) {
    return this.produtosService.remove(+id);
  }
}
