import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTamanhoDto } from './dto/create-tamanho.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tamanho } from './entities/tamanho.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TamanhosService {
  constructor(
    @InjectRepository(Tamanho)
    private tamanhoRepository: Repository<Tamanho>
  ) { }

  async create(createTamanhoDto: CreateTamanhoDto): Promise<Tamanho> {
    return await this.tamanhoRepository.save(createTamanhoDto);
  }

  async findAll(): Promise<Tamanho[]> {
    return await this.tamanhoRepository.find();
  }

  async remove(id: number): Promise<void> {
    const tamanho = await this.tamanhoRepository.findOne({
      where: { id: id }
    });

    if (!tamanho) {
      throw new NotFoundException("Esse tamanho nao existe!!");
    }

    await this.tamanhoRepository.remove(tamanho);
  }
}
