import { Module } from '@nestjs/common';
import { CampaignEmailService } from './campaign-email.service';
import { CampaignEmailController } from './campaign-email.controller';
import { CampaignEmailRepositoryModule } from '@/repository/campaign-email-repository';
import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { MailModule } from '@/common/modules/mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CampaignEmailRepositoryModule,
    MailModule,
  ],
  providers: [CampaignEmailService],
  controllers: [CampaignEmailController],
})
export class CampaignEmailModule {}
