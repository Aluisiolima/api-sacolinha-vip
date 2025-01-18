import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutosModule } from "./produtos/produtos.module";
import { EmpresaModule } from "./empresa/empresa.module";
import { Produto } from "./produtos/entities/produto.entity";
import { Empresa } from "./empresa/entities/empresa.entity";
import { PedidosModule } from './pedidos/pedidos.module';
import { VendasModule } from './vendas/vendas.module';
import { ArquivosModule } from './arquivos/arquivos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TamanhosModule } from './tamanhos/tamanhos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { Arquivo } from "./arquivos/entities/arquivo.entity";
import { Categoria } from "./categorias/entities/categoria.entity";
import { Venda } from "./vendas/entities/venda.entity";
import { Usuario } from "./usuarios/entities/usuario.entity";
import { Tamanho } from "./tamanhos/entities/tamanho.entity";
import { Pedido } from "./pedidos/entities/pedido.entity";

@Module({
  imports: [
    ProdutosModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "phpmyadmin",
      password: "root",
      database: "sacolinha_vip",
      entities: [Arquivo,Categoria,Empresa,Pedido,Produto,Tamanho,Usuario,Venda],
      synchronize: false,
    }),
    EmpresaModule,
    PedidosModule,
    VendasModule,
    ArquivosModule,
    UsuariosModule,
    TamanhosModule,
    CategoriasModule
  ],
  providers: [],
})
export class AppModule {}
