import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createCategoriaDto: CreateCategoriaDto, dateUser: { id: number, name: string, empresa: string }): Promise<Categoria> {
    if (dateUser.empresa && dateUser.empresa === process.env.MASTER_NAME) {
      return await this.categoriaRepository.save(createCategoriaDto);
    }
    throw new BadRequestException("Voce nao tem autorizacao para inserir uma categoria nova!!!")
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find(
      {
        relations: ["produtos"]
      }
    );
  }

  async remove(id: number, dateUser: { id: number, name: string, empresa: string }): Promise<void> {
    if (!dateUser.empresa && dateUser.empresa !== process.env.MASTER_NAME) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id: id }
      });
  
      if (!categoria) {
        throw new NotFoundException("Essa categoria nao existe!!");
      }
  
      await this.categoriaRepository.remove(categoria);
    }
    throw new BadRequestException("Voce nao tem autorizacao para remove essa categoria!!!")
  }
}
