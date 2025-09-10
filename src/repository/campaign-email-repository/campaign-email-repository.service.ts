import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
// import { PrismaService } from 'src/common/modules/prisma';
import { CampaignEmailRepositoryServiceAbstract } from './campaign-email-repository.abstract';
import {
  CreateCampaignEmailArgs,
  CampaignEmailEntity,
  CampaignEmailListType,
} from './campaign-email-repository.interface';
import {
  CreateCampaignEmailDto,
  CreateCampaignResponseDto,
} from '@/modules/campaign-email/dto';
import { PrismaService } from '@/common/modules/prisma/prisma.service';
import {
  CampaignEmailDto,
  CampaignEmailLogDto,
  CampaignNameType,
} from './campaign-email-repository.dto';
import { CampaignEmailStatus } from '@/common/enum';
// import { PrismaService } from '@/common/modules/prisma/prisma.service';

@Injectable()
export class CampaignEmailRepositoryService
  implements CampaignEmailRepositoryServiceAbstract
{
  private readonly logger = new Logger(CampaignEmailRepositoryService.name);
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CampaignEmailEntity[]> {
    return this.prisma.campaignEmail.findMany();
  }

  async findAllNames(): Promise<CampaignEmailListType[]> {
    return this.prisma.campaignEmail.findMany({
      select: { subject: true },
    });
  }

  async findCampaignNameById(campaignId: number): Promise<CampaignNameType> {
    try {
      return this.prisma.campaign.findUniqueOrThrow({
        where: { id: campaignId },
        select: { name: true },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async createLogHistory(args: CampaignEmailLogDto): Promise<void> {
    const { campaignEmailId, ...logData } = args;
    console.log('CampaignEmail object:', JSON.stringify(logData, null, 2));
    try {   
      await this.prisma.logHistory.create({
        data: {
          campaignEmailId,
          email: logData.email,
          emailContent: logData.emailContent,
          sendType: logData.sendType,
        },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: CampaignEmailDto): Promise<CampaignEmailEntity> {
    // in real usecase I would check template too. but this phase not implement yet
    try {
      
      return this.prisma.campaignEmail.create({
        data: {
          campaignId: 1,
          subject: data.subject,
          emails: data.emails,
          emailContent: data.emailContent,
          status: data.status,
          templateId: null,
          schedule: null,
        },
      });
    } catch (err) {
      console.log('err here');
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateStatus(id: number, status: CampaignEmailStatus): Promise<void> {
    console.log(`update status > ${status}`);
    try {
      await this.prisma.campaignEmail.update({
        where: { id: id },
        data: { status: 'DRAFT' },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
