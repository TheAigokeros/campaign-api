// email.processor.ts
import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { MailService } from '@/common/modules/mail/mail.service';
import { CampaignEmailRepositoryService } from 'src/repository/campaign-email-repository';
import {
  CampaignEmailStatus,
  CampaignEmailSendType,
} from '@/common/enum/global.enum';

@Processor('email')
export class EmailProcessor {
  constructor(
    private readonly mailService: MailService,
    private readonly campaignEmailRepositoryService: CampaignEmailRepositoryService,
  ) {}

  @Process('send-email')
  async handleSendEmail(job: Job) {
    const { campaignEmailId, emails, subject, body } = job.data;

    try {
      const is_success = await this.mailService.sendUserConfirmation({
        to: emails,
        subject,
        html: body,
      });

      if (is_success) {
        await this.campaignEmailRepositoryService.createLogHistory({
          campaignEmailId,
          subject,
          email: emails.join(', '),
          emailContent: body,
          sendType: CampaignEmailSendType.Trigger,
        });

        await this.campaignEmailRepositoryService.updateStatus(
          campaignEmailId,
          CampaignEmailStatus.Send,
        );
      } else {
        await this.campaignEmailRepositoryService.updateStatus(
          campaignEmailId,
          CampaignEmailStatus.Fail,
        );

        await this.campaignEmailRepositoryService.createLogHistory({
          campaignEmailId,
          subject,
          email: emails.join(', '),
          emailContent: body,
          sendType: CampaignEmailSendType.Fail,
        });
      }
    } catch (err) {
      await this.campaignEmailRepositoryService.updateStatus(
        campaignEmailId,
        CampaignEmailStatus.Fail,
      );

      await this.campaignEmailRepositoryService.createLogHistory({
        campaignEmailId,
        subject,
        email: emails.join(', '),
        emailContent: body,
        sendType: CampaignEmailSendType.Fail,
      });
      throw err;
    }
  }
}
