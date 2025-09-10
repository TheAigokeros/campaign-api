import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEmailEntity } from './mail.interface';
// import { User } from './../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation({
    to,
    subject,
    html,
    from = '"Developer Team" <support@gmail-jenosize>',
  }: {
    to: string | string[];
    subject: string;
    html: string;
    from?: string;
  }): Promise<boolean> {
    try {
      await this.mailerService.sendMail({ to, from, subject, html });
      return true;
    } catch (e) {
      return false;
    }
  }
}
