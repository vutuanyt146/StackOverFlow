import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string, codeVerify: string) {
    this.mailerService
      .sendMail({
        to: email, // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Verify mail ✔', // Subject line
        html: `<b>Your code: ${codeVerify}</b>`, // HTML body content
      })
      .then()
      .catch((error) => {
        console.log('here', error);
      });
  }
}
