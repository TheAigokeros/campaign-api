import { Test, TestingModule } from '@nestjs/testing';
import { CampaignEmailService } from './campaign-email.service';

describe('CampaignEmailService', () => {
  let service: CampaignEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignEmailService],
    }).compile();

    service = module.get<CampaignEmailService>(CampaignEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
