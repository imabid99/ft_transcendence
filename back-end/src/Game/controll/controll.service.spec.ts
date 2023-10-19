import { Test, TestingModule } from '@nestjs/testing';
import { ControllService } from './controll.service';

describe('ControllService', () => {
  let service: ControllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControllService],
    }).compile();

    service = module.get<ControllService>(ControllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
