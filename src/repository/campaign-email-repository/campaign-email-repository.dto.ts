import { IsEnum } from 'class-validator';
import { CampaignEmailSendType, Campaign } from 'generated/prisma';

export type CampaignNameType = Pick<Campaign, 'name'>

export class CampaignDto {
  id?: number;
  name: string;
  description?: string;
  datetimeCreate?: Date;
  datetimeUpdate?: Date;
}

export class CampaignEmailDto {
  templateId?: number;
  campaignId: number;
  emails: string[];
  subject: string;
  emailContent: string;
  schedule?: Date;
  status: 'DRAFT' | 'SEND' | 'CANCEL' | 'SCHEDULE' | 'FAIL';
  datetimeCreate?: Date;
  datetimeUpdate?: Date;
}

export class CampaignEmailLogDto {
  templateId?: number;
  campaignEmailId: number;
  email: string;
  subject: string;
  emailContent: string;

  @IsEnum(CampaignEmailSendType)
  sendType: CampaignEmailSendType;

  datetimeCreate?: Date;
  datetimeUpdate?: Date;
}

export interface CampaignEmailRecord {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
}
