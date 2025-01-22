import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Arquivo } from 'src/arquivos/entities/arquivo.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository:Repository<Produto>,
    @InjectRepository(Arquivo)
    private arquivoRepository:Repository<Arquivo>
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return await this.produtoRepository.save(createProdutoDto);
  }

  async findAll(id_empresa: number) {
    return await this.produtoRepository.find({
      where:{
        empresa : {id : id_empresa}
      },
      relations: ["id_img","id_tamanho","id_categoria"]
    });
  }

  async inserirImg(ProdutoId:number, ImgId:number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id : ProdutoId },
      relations: ["id_img"],
    });

    if(!produto){
      throw new NotFoundException("Nao existe esse Produto!!!");
    }

    const ImgExiste = produto.arquivos.some((Img) => Img.id == ImgId);

    if(ImgExiste){
      throw new BadRequestException("Essa imagem ja esta relacionada com esse Produto!!!");
    }

    const arquivo = await this.arquivoRepository.findOne({
      where: { id : ImgId }
    });

    if (!arquivo) {
      throw new NotFoundException("Essa Img nao exite!!")
    }

    if (arquivo.tipo !== "imagem"){
      throw new BadRequestException("Essa Img nao esta no formato correto!!")
    }

    produto.arquivos.push(arquivo);
    return await this.produtoRepository.save(produto);
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id : id },
      relations: ["id_img","id_tamanho"],
    });

    if (!produto) {
      throw new NotFoundException("Esse produto nao Existe !!")
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<void>{
    const produto = await this.produtoRepository.findOne({
      where: {id:id}
    });

    if (!produto){
      throw new NotFoundException("Esse produto nao existe!!");
    }

    await this.produtoRepository.update(id, updateProdutoDto);

  }

  async remove(id: number): Promise<void> {
    const produto = await this.produtoRepository.findOne({
      where: {id:id}
    });

    if (!produto){
      throw new NotFoundException("Esse produto nao existe!!");
    }

    await this.produtoRepository.remove(produto);
  }
}
