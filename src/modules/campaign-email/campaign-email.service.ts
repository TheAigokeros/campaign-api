import { Inject, Injectable } from '@nestjs/common';
import {campaignEmailServiceAbstract} from './campaign-email.abstract'
import { CampaignEmailRepositoryService, CampaignEmailRepositoryServiceAbstract, CampaignEmailRepositoryServiceProvider } from 'src/repository/campaign-email-repository'
import { CreateCampaignRequestDto, CreateCampaignResponseDto, ListCampaignEmailResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { MailService } from '@/common/modules/mail/mail.service';
import { CampaignEmailStatus, CampaignEmailSendType} from '@/common/enum/global.enum';

@Injectable()
export class CampaignEmailService implements campaignEmailServiceAbstract{
    
    constructor(
        @Inject(CampaignEmailRepositoryServiceProvider)
        private readonly campaignEmailRepositoryService: CampaignEmailRepositoryServiceAbstract,
        private readonly mailService: MailService
    ) {}

    
    private readonly UNIQUE_KEYS = ['EMAIL'];
    
    async createAndSendCampaign(
      params: CreateCampaignRequestDto,
    ): Promise<CreateCampaignResponseDto[]> {      
      const campaignEmail = await this.campaignEmailRepositoryService.create({
        campaignId: 1,
        subject: params.subject,
        emails: params.emails,
        emailContent: params.body,
        status: CampaignEmailStatus.Draft
      });
        
      let isIndividual = this.UNIQUE_KEYS.some((key) =>
        params.body.includes(`<${key}>`),
      )

      let is_success;
  
      isIndividual=false

      const results: CreateCampaignResponseDto[] = [];
  
      if (isIndividual) {
       // if unique message we will transform message by each user and send
        console.log('not implement for this phase')
      } else {
        is_success = await this.mailService.sendUserConfirmation({
          to: params.emails,
          subject: params.subject,
          html: params.body,
        });           

        if (is_success) {                         
          await this.campaignEmailRepositoryService.createLogHistory({
            campaignEmailId: campaignEmail.id,
            subject: params.subject,
            email: params.emails.join(', '),
            emailContent: params.body,
            sendType: CampaignEmailSendType.Trigger
          });          
        }
        else{          
            // update campaignEmail and create CampaignEmailLog it fail 
            await this.campaignEmailRepositoryService.updateStatus(
              campaignEmail.id,
              CampaignEmailStatus.Cancel
            );
            
            await this.campaignEmailRepositoryService.createLogHistory({
              campaignEmailId: campaignEmail.id,
              email: params.emails.join(', '),
              subject: params.subject,
              emailContent: params.body,
              sendType: CampaignEmailSendType.Fail,
            });                  
        }
      } 


      results.push(
        {
        campaignId: campaignEmail.campaignId,
        campaignEmailId: campaignEmail.id,
        email: params.emails.join(', '),
        status: is_success ? 'SUCCESS' : 'FAIL',
      });
  
      return plainToInstance(CreateCampaignResponseDto, results, {
        excludeExtraneousValues: true,
      });
    }

    async findall(): Promise<ListCampaignEmailResponseDto[]> {
        // return this.campaignEmailRepositoryService.findAll()
        const data = await this.campaignEmailRepositoryService.findAll();
        return plainToInstance(ListCampaignEmailResponseDto, data, { excludeExtraneousValues: true });
    }
    
    async delete(id: number): Promise<boolean> {        
        throw new Error('Method not implemented for this phase');
    }    
}
