import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Arquivo } from 'src/arquivos/entities/arquivo.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Arquivo)
    private arquivoRepository: Repository<Arquivo>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    return await this.empresaRepository.save(createEmpresaDto);
  }

  async InserirProprietario(date: {
    empresa: number;
    user: number;
  }): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOne({
      where: { id: date.empresa },
    });

    if (!empresa) {
      throw new NotFoundException('Nao existe esse empresa!!!');
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id: date.user },
    });

    if (!usuario) {
      throw new NotFoundException('Esse usuario nao exite!!');
    }

    empresa.usuario = usuario;

    return await this.empresaRepository.save(empresa);
  }

  async InserirImgLogo(date: {
    empresa: number;
    arquivo: number;
  }): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOne({
      where: { id: date.empresa },
    });

    if (!empresa) {
      throw new NotFoundException('Nao existe esse empresa!!!');
    }

    const arquivo = await this.arquivoRepository.findOne({
      where: { id: date.arquivo },
    });

    if (!arquivo) {
      throw new NotFoundException('Essa Img nao exite!!');
    }

    if (!arquivo.tipo.includes('image')) {
      throw new BadRequestException('Essa Img nao esta no formato correto!!');
    }

    empresa.arquivo = arquivo;

    return await this.empresaRepository.save(empresa);
  }

  async findAll(): Promise<Empresa[]> {
    return await this.empresaRepository.find({
      relations: ['arquivo'],
    });
  }

  async findOne(id: number): Promise<Empresa> {
    return await this.empresaRepository.findOne({
      where: { id: id },
      relations: ['arquivo'],
    });
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto): Promise<void> {
    const empresa = await this.empresaRepository.findOne({
      where: { id: id },
    });

    if (!empresa) {
      throw new NotFoundException('Essa empresa nao existe!!');
    }

    await this.empresaRepository.update(id, updateEmpresaDto);
  }

  async remove(id: number): Promise<void> {
    const empresa = await this.empresaRepository.findOne({
      where: { id: id },
    });

    if (!empresa) {
      throw new NotFoundException('Essa empresa nao existe!!');
    }

    await this.empresaRepository.remove(empresa);
  }
}
