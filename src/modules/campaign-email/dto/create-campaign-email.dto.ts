import { Expose } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { CampaignEmailStatus } from '@/common/enum/global.enum';

export type CampaignSendStatus = 'SUCCESS' | 'FAIL' | 'PROGRESS';

export class CreateCampaignEmailDto {
  @IsString()
  name: string;

  @IsString()
  subject: string;

  @IsString()
  email: string;

  @IsString()
  emailContent: string;

  @IsEnum(CampaignEmailStatus)
  status: CampaignEmailStatus;
}

export class CreateCampaignRequestDto {
  @IsString()
  @IsNotEmpty()
  campaignName: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  // @IsString()
  @IsArray()
  @IsEmail({}, { each: true })
  emails: string[];

  // @IsArray()
  // @IsEmail({}, { each: true })
  // receivers: string[];

  @IsString()
  @IsNotEmpty()
  body: string;
}

export class CreateCampaignResponseDto {
  @Expose()
  @IsNotEmpty()
  campaignId: number;

  @Expose()
  @IsNotEmpty()
  campaignEmailId: number;

  @Expose()
  email: string;

  @Expose()
  taskId: string;

  @Expose()
  status: CampaignSendStatus;
}
