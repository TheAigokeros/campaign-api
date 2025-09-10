import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailProcessor } from './campaign-email.processor';
import { MailService } from '@/common/modules/mail/mail.service';
import { CampaignEmailRepositoryService } from '../repository/campaign-email-repository';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'email' }),
  ],
  providers: [EmailProcessor, MailService, CampaignEmailRepositoryService],
})
export class QueueModule {}
