import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';

const dto = {
  nome: "nome",
  valor: 10,
  desconto: 10,
  empresa: 1,
  estoque: 2,
  categoria: 1,
};
const dto_update = {
  nome: "nome",
  valor: 10,
  desconto: 10,
  empresa: 1,
  estoque: 2,
  categoria: 1,
};

describe('ProdutosController', () => {
  let produtoController: ProdutosController;
  let produtosService: ProdutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [
        {
          provide: ProdutosService,
          useValue: {
            create: jest.fn().mockImplementation(),
            inserirTamanho: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },         
        },
      ],
    }).compile();

    produtoController = module.get<ProdutosController>(ProdutosController);
    produtosService = module.get<ProdutosService>(ProdutosService);
  });

  it('should be defined', () => {
    expect(produtoController).toBeDefined();
    expect(produtosService).toBeDefined();
  });
});
