import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosModule } from './produtos/produtos.module';
import { EmpresaModule } from './empresa/empresa.module';
import { Produto } from './produtos/entities/produto.entity';
import { Empresa } from './empresa/entities/empresa.entity';
import { PedidosModule } from './pedidos/pedidos.module';
import { VendasModule } from './vendas/vendas.module';
import { ArquivosModule } from './arquivos/arquivos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TamanhosModule } from './tamanhos/tamanhos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { Arquivo } from './arquivos/entities/arquivo.entity';
import { Categoria } from './categorias/entities/categoria.entity';
import { Venda } from './vendas/entities/venda.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Tamanho } from './tamanhos/entities/tamanho.entity';
import { Pedido } from './pedidos/entities/pedido.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB,
      host: process.env.HOST_DB,
      port: process.env.PORT_DB,
      username: process.env.USER_DB,
      password: process.env.SENHA_DB,
      database: process.env.DB_NAME,
      entities: [
        Arquivo,
        Categoria,
        Empresa,
        Pedido,
        Produto,
        Tamanho,
        Usuario,
        Venda,
      ],
      synchronize: false,
    } as TypeOrmModule),
    ProdutosModule,
    EmpresaModule,
    PedidosModule,
    VendasModule,
    ArquivosModule,
    UsuariosModule,
    TamanhosModule,
    CategoriasModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
