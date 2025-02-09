import { IsInt, IsString } from "class-validator"
import { Empresa } from "src/empresa/entities/empresa.entity"
import * as bcrypt from "bcryptjs";

export class CreateUsuarioDto {

    @IsString()
    nome: string

    @IsString()
    senha: string

    @IsString()
    cargo: string

    @IsInt()
    empresa: Empresa

    encryption(): Promise<string> {
        const saltRounds = 10;
        return  bcrypt.hash(this.senha, saltRounds);
    }
}
