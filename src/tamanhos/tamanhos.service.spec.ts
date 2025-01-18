import { Test, TestingModule } from '@nestjs/testing';
import { TamanhosService } from './tamanhos.service';

describe('TamanhosService', () => {
  let service: TamanhosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TamanhosService],
    }).compile();

    service = module.get<TamanhosService>(TamanhosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
