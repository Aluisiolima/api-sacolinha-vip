import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) { }

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return await this.categoriaRepository.save(createCategoriaDto);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find(
      {
        relations: ["produtos"]
      }
    );
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: id }
    });

    if (!categoria) {
      throw new NotFoundException("Essa categoria nao existe!!");
    }

    await this.categoriaRepository.remove(categoria);
  }
}
