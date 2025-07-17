import { Test, TestingModule } from '@nestjs/testing';
import { FiatService } from './fiat.service';

describe('FiatService', () => {
  let service: FiatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FiatService],
    }).compile();

    service = module.get<FiatService>(FiatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
