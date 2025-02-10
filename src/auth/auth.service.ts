import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { compare } from "bcryptjs"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuariosService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(name: string, cargo: string, password: string): Promise<Usuario> {
        const user = await this.usuarioService.search(name, cargo);

        if (user) {
            const isPassword = await compare(password, user.senha);
            if (!isPassword) return null;
        }

        return user;
    }

    async login(user:Usuario) {
        const payload = { sub: user.id, nome: user.nome, cargo: user.cargo, empresa: user.empresa.id };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
