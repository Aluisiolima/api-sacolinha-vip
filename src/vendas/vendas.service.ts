import { Injectable } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
  ) {}

  async create(createVendaDto: CreateVendaDto): Promise<Venda> {
    return await this.vendaRepository.save(createVendaDto);
  }

  async findAll(idEmpresa: number): Promise<Venda[]> {
    return await this.vendaRepository.find({
      where: {
        empresa: { id: idEmpresa },
      },
    });
  }
}
