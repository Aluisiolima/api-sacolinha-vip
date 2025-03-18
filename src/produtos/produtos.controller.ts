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
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('inserir')
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':idProduto/addImg/:idImg/')
  inserirImg(
    @Param('idProduto') idProduto: number,
    @Param('idImg') idImg: number,
  ) {
    return this.produtosService.inserirImg(idProduto, idImg);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':idProduto/addTamanho/:idTamanho/')
  inserirTamanho(
    @Param('idProduto') idProduto: number,
    @Param('idTamanho') idTamanho: number,
  ) {
    return this.produtosService.inserirTamanho(idProduto, idTamanho);
  }

  @Get('pegarAll/:idEmpresa')
  findAll(@Param('idEmpresa') id: string) {
    return this.produtosService.findAll(+id);
  }

  @Get('pegarAll/:idEmpresa/name')
  findAllName(@Param('idEmpresa') id: string) {
    return this.produtosService.findAllName(+id);
  }

  @Get('pegar/:id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
