import { IsString } from 'class-validator';

export class UpdateUsuarioDto {
    @IsString()
    nome?: string

    @IsString()
    senha?: string

    @IsString()
    cargo?: string

}
