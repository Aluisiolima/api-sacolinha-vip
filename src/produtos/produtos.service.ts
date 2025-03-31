import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Arquivo } from 'src/arquivos/entities/arquivo.entity';
import { Tamanho } from 'src/tamanhos/entities/tamanho.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    @InjectRepository(Arquivo)
    private arquivoRepository: Repository<Arquivo>,
    @InjectRepository(Tamanho)
    private tamanhoRepository: Repository<Tamanho>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return await this.produtoRepository.save(createProdutoDto);
  }

  async findAll(id_empresa: number) {
    return await this.produtoRepository.find({
      where: {
        empresa: { id: id_empresa },
      },
      relations: {
        arquivos:true,
      },
      order: { categoria: {id: "ASC"}}
    });
  }

  async findAllName(id_empresa: number) {
    return await this.produtoRepository.find({
      where: {
        empresa: { id: id_empresa },
      },
      select: {
        id:true,
        nome:true,
      },
      order: { nome: 'ASC'}
    });
  }

  async inserirImg(ProdutoId: number, ImgId: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id: ProdutoId },
      relations: ['arquivos'],
    });

    if (!produto) {
      throw new NotFoundException('Nao existe esse Produto!!!');
    }

    const ImgExiste = produto.arquivos.some((Img) => Img.id == ImgId);

    if (ImgExiste) {
      throw new BadRequestException(
        'Essa imagem ja esta relacionada com esse Produto!!!',
      );
    }

    const arquivo = await this.arquivoRepository.findOne({
      where: { id: ImgId },
    });

    if (!arquivo) {
      throw new NotFoundException('Essa Img nao exite!!');
    }

    if (!arquivo.tipo.includes('image')) {
      throw new BadRequestException('Essa Img nao esta no formato correto!!');
    }

    produto.arquivos.push(arquivo);
    return await this.produtoRepository.save(produto);
  }

  async inserirTamanho(ProdutoId: number, tamanhoId: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id: ProdutoId },
      relations: ['tamanhos'],
    });

    if (!produto) {
      throw new NotFoundException('Nao existe esse Produto!!!');
    }

    const TamanhoExiste = produto.tamanhos.some(
      (tamanho) => tamanho.id == tamanhoId,
    );

    if (TamanhoExiste) {
      throw new BadRequestException(
        'Essa imagem ja esta relacionada com esse Produto!!!',
      );
    }

    const tamanho = await this.tamanhoRepository.findOne({
      where: { id: tamanhoId },
    });

    if (!tamanho) {
      throw new NotFoundException('Essa Img nao exite!!');
    }

    produto.tamanhos.push(tamanho);
    return await this.produtoRepository.save(produto);
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id: id },
      relations: ['arquivos', 'tamanhos'],
    });

    if (!produto) {
      throw new NotFoundException('Esse produto nao Existe !!');
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<void> {
    const produto = await this.produtoRepository.findOne({
      where: { id: id },
    });

    if (!produto) {
      throw new NotFoundException('Esse produto nao existe!!');
    }

    await this.produtoRepository.update(id, updateProdutoDto);
  }

  async remove(id: number): Promise<void> {
    const produto = await this.produtoRepository.findOne({
      where: { id: id },
    });

    if (!produto) {
      throw new NotFoundException('Esse produto nao existe!!');
    }

    await this.produtoRepository.remove(produto);
  }
}
