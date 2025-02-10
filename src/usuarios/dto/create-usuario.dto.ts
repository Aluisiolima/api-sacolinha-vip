import { IsInt, IsNotEmpty, IsString } from "class-validator"
import { Empresa } from "src/empresa/entities/empresa.entity"

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    senha: string

    @IsString()
    @IsNotEmpty()
    cargo: string

    @IsInt()
    @IsNotEmpty()
    empresa: Empresa

}
