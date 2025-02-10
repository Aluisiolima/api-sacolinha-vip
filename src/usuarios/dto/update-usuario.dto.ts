import { IsOptional, IsString } from 'class-validator';

export class UpdateUsuarioDto {
    @IsOptional()
    @IsString()
    nome?: string

    @IsOptional()
    @IsString()
    senha?: string

    @IsOptional()
    @IsString()
    cargo?: string

}
