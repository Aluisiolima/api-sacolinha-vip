import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository:Repository<Produto>
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
