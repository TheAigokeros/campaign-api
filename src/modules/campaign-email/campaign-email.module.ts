import { Module } from '@nestjs/common';
import { CampaignEmailService } from './campaign-email.service';
import { CampaignEmailController } from './campaign-email.controller';
import { CampaignEmailRepositoryModule } from '@/repository/campaign-email-repository';
import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { MailModule } from '@/common/modules/mail/mail.module';

@Module({
  imports: [CampaignEmailRepositoryModule, MailModule],
  providers: [CampaignEmailService],
  controllers: [CampaignEmailController]
})
export class CampaignEmailModule {}
