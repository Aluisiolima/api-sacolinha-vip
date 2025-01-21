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
        id_empresa : {id : id_empresa}
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

    const ImgExiste = produto.id_img.some((Img) => Img.id == ImgId);

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

    produto.id_img.push(arquivo);
    return await this.produtoRepository.save(produto);
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
