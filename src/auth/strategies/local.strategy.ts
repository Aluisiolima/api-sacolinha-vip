import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'nome',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, nome: string, password: string) {
    const cargo = req.body.cargo;

    const user = await this.authService.validateUser(nome, cargo, password);

    if (!user)
      throw new UnauthorizedException(
        'Credencias de Usuario Invalidadas e/ou nao encontradas',
      );

    return user;
  }
}
