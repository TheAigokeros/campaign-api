import {
  CreateCampaignRequestDto,
  CreateCampaignResponseDto,
  ListCampaignEmailResponseDto,
} from './dto';

export abstract class campaignEmailServiceAbstract {
  abstract findall(): Promise<ListCampaignEmailResponseDto[]>;
  // abstract createAndSendMail( args: CreateCampaignRequestDto ): Promise<CreateCampaignResponseDto>;
  abstract createAndSendCampaign(
    args: CreateCampaignRequestDto,
  ): Promise<CreateCampaignResponseDto>;
  abstract delete(id: number): Promise<boolean>;  
}
