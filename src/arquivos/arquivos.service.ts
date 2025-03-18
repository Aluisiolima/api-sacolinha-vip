import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arquivo } from './entities/arquivo.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ArquivosService {
  constructor(
    @InjectRepository(Arquivo)
    private arquivoRepository: Repository<Arquivo>,
  ) {}

  async create(createArquivoDto: CreateArquivoDto): Promise<Arquivo> {
    return await this.arquivoRepository.save(createArquivoDto);
  }

  async findAll(idEmpresa: number): Promise<Arquivo[]> {
    return await this.arquivoRepository.find({
      where: { empresa: { id: idEmpresa } },
    });
  }

  async remove(id: number): Promise<void> {
    const arquivo = await this.arquivoRepository.findOne({
      where: { id: id },
    });

    if (!arquivo) {
      throw new NotFoundException('Esse arquivo nao existe!!');
    }
    await this.arquivoRepository.remove(arquivo);
    return new Promise((resolve, reject) => {
      // Resolve o caminho absoluto
      const absolutePath = path.resolve(arquivo.path);

      // Tenta deletar o arquivo
      fs.unlink(absolutePath, (err) => {
        if (err) {
          reject(`Erro ao deletar o arquivo: ${err.message}`);
        } else {
          resolve();
        }
      });
    });
  }
}
