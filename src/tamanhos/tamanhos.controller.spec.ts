import { Test, TestingModule } from '@nestjs/testing';
import { TamanhosController } from './tamanhos.controller';
import { TamanhosService } from './tamanhos.service';

describe('TamanhosController', () => {
  let controller: TamanhosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TamanhosController],
      providers: [TamanhosService],
    }).compile();

    controller = module.get<TamanhosController>(TamanhosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
