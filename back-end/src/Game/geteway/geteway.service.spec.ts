import { Test, TestingModule } from '@nestjs/testing';
import { GetewayService } from './geteway.service';

describe('GetewayService', () => {
  let service: GetewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetewayService],
    }).compile();

    service = module.get<GetewayService>(GetewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
