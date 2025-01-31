import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArquivosService } from './arquivos.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Controller('arquivos')
export class ArquivosController {
  constructor(private readonly arquivosService: ArquivosService) {}

  @Post("insert/:idEmpresa")
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Pasta onde as imagens serão salvas
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param("idEmpresa") idEmpresa:number) {
    const arquivo = {
      tipo:file.mimetype,
      path:file.path,
      empresa: {id : idEmpresa} as Empresa
    }
    return this.arquivosService.create(arquivo)
  }

  @Get(":idEmpresa")
  findAll(@Param("idEmpresa") idEmpresa:number) {
    return this.arquivosService.findAll(+idEmpresa);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arquivosService.remove(+id);
  }
}

