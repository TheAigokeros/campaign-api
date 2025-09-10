import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppController from './app.controller';
import { AppService } from './app.service';
import { CampaignEmailModule } from './modules/campaign-email/campaign-email.module';
import { MailModule } from './common/modules/mail/mail.module';
import { QueueModule } from './queue/queue.module';
@Module({
  imports: [
    QueueModule,
    CampaignEmailModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
