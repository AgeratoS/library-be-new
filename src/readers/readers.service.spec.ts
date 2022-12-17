import { Test, TestingModule } from '@nestjs/testing';
import { ReadersService } from './readers.service';

describe('ReadersService', () => {
  let service: ReadersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadersService],
    }).compile();

    service = module.get<ReadersService>(ReadersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
