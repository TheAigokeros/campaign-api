import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppController  from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './modules/auth/auth.module';
// import { AccountModule } from './modules/account/account.module';
// import { MailModule } from './modules/mail/mail.module';
// import { TemplateManagementsModule } from './modules/template-managements/template-managements.module';
import { CampaignEmailModule } from './modules/campaign-email/campaign-email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './common/modules/mail/mail.module';
@Module({
  imports: [CampaignEmailModule, 
            ConfigModule.forRoot({
            isGlobal: true, // no need to import into other modules
          }),
          MailModule
  ,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
