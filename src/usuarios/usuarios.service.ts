import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    createUsuarioDto.senha = await bcrypt.hash(createUsuarioDto.senha, 10);
    return await this.usuarioRepository.save(createUsuarioDto);
  }

  async findAll(empresaId: number): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: {
        empresa: { id: empresaId }
      }
    });
  }

  async findOne(id: number): Promise<Usuario> {
    return await this.usuarioRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<void> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: id }
    });

    if (!usuario) {
      throw new NotFoundException("Esse usuario nao existe!!");
    }

    if (updateUsuarioDto.senha) {
      updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha, 10);
    }

    await this.usuarioRepository.update(id, updateUsuarioDto);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: id }
    });

    if (!usuario) {
      throw new NotFoundException("Esse usuario nao existe!!");
    }
    await this.usuarioRepository.remove(usuario);
  }
}
