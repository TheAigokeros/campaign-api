import { Inject, Injectable, Logger } from '@nestjs/common';
import { campaignEmailServiceAbstract } from './campaign-email.abstract';
import {
  CampaignEmailRepositoryService,
  CampaignEmailRepositoryServiceAbstract,
  CampaignEmailRepositoryServiceProvider,
} from 'src/repository/campaign-email-repository';
import {
  CreateCampaignRequestDto,
  CreateCampaignResponseDto,
  ListCampaignEmailResponseDto,
} from './dto';
import { plainToInstance } from 'class-transformer';
import type { Queue } from 'bull';
import { MailService } from '@/common/modules/mail/mail.service';
import {
  CampaignEmailStatus,
  CampaignEmailSendType,
} from '@/common/enum/global.enum';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class CampaignEmailService implements campaignEmailServiceAbstract {
  private logger = new Logger(CampaignEmailService.name);

  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue,
    @Inject(CampaignEmailRepositoryServiceProvider)
    private readonly campaignEmailRepositoryService: CampaignEmailRepositoryServiceAbstract,
    private readonly mailService: MailService,
  ) {}

  private readonly GENERIC_KEYS = ['CAMPAIGN', 'XXX'];
  private readonly UNIQUE_KEYS = ['EMAIL'];

  async createAndSendCampaign(
    params: CreateCampaignRequestDto,
  ): Promise<CreateCampaignResponseDto> {    
    const campaignEmail = await this.campaignEmailRepositoryService.create({
      campaignId: 1, // mock
      subject: params.subject,
      emails: params.emails,
      emailContent: params.body,
      status: CampaignEmailStatus.Draft,
    });

    const isIndividual = this.UNIQUE_KEYS.some((key) =>
      new RegExp(`\\s*<\\s*\\$?${key}\\s*>`, 'i').test(params.body),
    );

    let emailBodyToSend = params.body;    

    let result: CreateCampaignResponseDto = {
      campaignId: campaignEmail.campaignId,
      campaignEmailId: campaignEmail.id,
      email: params.emails.join(', '),
      taskId: '',
      status: 'PROGRESS',
    };

    this.GENERIC_KEYS.forEach((key) => {
      const regex = new RegExp(`<\\s*\\$${key}\\s*>`, 'gi'); // matches <$KEY> with optional spaces
      let replacement = '';
      switch (key) {
        case 'CAMPAIGN':
          replacement = params.campaignName;
          break;
        case 'XXX':
          replacement = 'Some Value';
          break;
        default:
          replacement = '';
          break;
      }
      emailBodyToSend = emailBodyToSend.replace(regex, replacement);
    });

    if (isIndividual === true) {
      console.log('loop for send each email for unique body');
    } else {
      const job = await this.emailQueue.add('send-email', {
        campaignEmailId: campaignEmail.id,
        emails: params.emails,
        subject: params.subject,
        body: emailBodyToSend,
      });
  
      result = {
        campaignId: campaignEmail.campaignId,
        campaignEmailId: campaignEmail.id,
        email: params.emails.join(', '),
        taskId: job.id.toString(),
        status: 'SUCCESS',
      };
    }

    return plainToInstance(CreateCampaignResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findall(): Promise<ListCampaignEmailResponseDto[]> {
    const data = await this.campaignEmailRepositoryService.findAll();
    return plainToInstance(ListCampaignEmailResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented for this phase');
  }
}
