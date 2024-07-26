import { Test, TestingModule } from '@nestjs/testing';
import { ConventionsService } from './conventions.service';

describe('ConventionsService', () => {
  let service: ConventionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConventionsService],
    }).compile();

    service = module.get<ConventionsService>(ConventionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
