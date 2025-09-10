import { CampaignEmailEntity } from './campaign-email-repository.interface';
import {
  CampaignEmailDto,
  CampaignEmailLogDto,
  CampaignNameType,
} from './campaign-email-repository.dto';
import { CampaignEmailStatus } from '@/common/enum';
export abstract class CampaignEmailRepositoryServiceAbstract {
  abstract findAll(): Promise<CampaignEmailEntity[]>;
  abstract findCampaignNameById(campaignId: number): Promise<CampaignNameType>;
  abstract create(data: CampaignEmailDto): Promise<CampaignEmailEntity>;
  abstract createLogHistory(data: CampaignEmailLogDto): Promise<void>;
  abstract updateStatus(id: number, status: CampaignEmailStatus): Promise<void>;
}
