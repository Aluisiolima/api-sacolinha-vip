import { Injectable } from '@nestjs/common';
import { CreateTamanhoDto } from './dto/create-tamanho.dto';
import { UpdateTamanhoDto } from './dto/update-tamanho.dto';

@Injectable()
export class TamanhosService {
  create(createTamanhoDto: CreateTamanhoDto) {
    return 'This action adds a new tamanho';
  }

  findAll() {
    return `This action returns all tamanhos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tamanho`;
  }

  update(id: number, updateTamanhoDto: UpdateTamanhoDto) {
    return `This action updates a #${id} tamanho`;
  }

  remove(id: number) {
    return `This action removes a #${id} tamanho`;
  }
}
