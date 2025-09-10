import {	
    CampaignEmailEntity
} from './campaign-email-repository.interface';
import { CampaignEmailDto, CampaignEmailLogDto } from './campaign-email-repository.dto';
import { CampaignEmailStatus } from '@/common/enum';
// import {CampaignEmailInfo } from './campaign-repository.interface'

// export abstract class CampaignEmailRepositoryServiceAbstract {	
// 	abstract create(args: CreateCampaignEmailArgs): Promise<CampaignEmailInfo>;
// 	abstract findAll(): Promise<CampaignEmailList[]>;
// }

export abstract class CampaignEmailRepositoryServiceAbstract {
    abstract findAll(): Promise<CampaignEmailEntity[]>;
    abstract create(data: CampaignEmailDto): Promise<CampaignEmailEntity>
    abstract createLogHistory(data: CampaignEmailLogDto): Promise<void> ;
    abstract updateStatus(id: number, status: CampaignEmailStatus): Promise<void>;
}
