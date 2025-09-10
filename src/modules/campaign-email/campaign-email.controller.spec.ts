import { Test, TestingModule } from '@nestjs/testing';
import { CampaignEmailController } from './campaign-email.controller';

describe('CampaignEmailController', () => {
  let controller: CampaignEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignEmailController],
    }).compile();

    controller = module.get<CampaignEmailController>(CampaignEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
