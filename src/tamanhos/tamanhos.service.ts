import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createTamanhoDto: CreateTamanhoDto, dateUser: { id: number, name: string, empresa: string }): Promise<Tamanho> {
    if (dateUser.empresa && dateUser.empresa === process.env.MASTER_NAME) {
      return await this.tamanhoRepository.save(createTamanhoDto);
    }
    throw new BadRequestException("Voce nao tem autorizacao para inserir um tamanho novo!!!")
  }

  async findAll(): Promise<Tamanho[]> {
    return await this.tamanhoRepository.find();
  }

  async remove(id: number, dateUser: { id: number, name: string, empresa: string }): Promise<void> {
    if (!dateUser.empresa && dateUser.empresa !== process.env.MASTER_NAME) {
      throw new BadRequestException("Voce nao tem autorizacao para remove um tamanho!!!")
    }
    const tamanho = await this.tamanhoRepository.findOne({
      where: { id: id }
    });

    if (!tamanho) {
      throw new NotFoundException("Esse tamanho nao existe!!");
    }

    await this.tamanhoRepository.remove(tamanho);
  }
}
