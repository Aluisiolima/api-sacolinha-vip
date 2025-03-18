import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { console } from 'node:inspector';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    createUsuarioDto.senha = await hash(createUsuarioDto.senha, 10);
    return await this.usuarioRepository.save(createUsuarioDto);
  }

  async findAll(empresaId: number): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: {
        empresa: { id: empresaId },
      },
    });
  }

  async findOne(id: number): Promise<Usuario> {
    return await this.usuarioRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<void> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: id },
    });

    if (!usuario) {
      throw new NotFoundException('Esse usuario nao existe!!');
    }

    if (updateUsuarioDto.senha) {
      updateUsuarioDto.senha = await hash(updateUsuarioDto.senha, 10);
    }

    await this.usuarioRepository.update(id, updateUsuarioDto);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: id },
    });

    if (!usuario) {
      throw new NotFoundException('Esse usuario nao existe!!');
    }
    await this.usuarioRepository.remove(usuario);
  }

  async search(name: string, cargo: string): Promise<Usuario> {
    try {
      return await this.usuarioRepository.findOneOrFail({
        where: {
          nome: name,
          cargo: cargo,
        },
        relations: ['empresa'],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
