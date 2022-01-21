import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) { }

  public example(toEmail, subject, text): void {
    this
      .mailerService
      .sendMail({
        to: toEmail, // List of receivers email address
        from: process.env.FROM_EMAIL, // Senders email address
        subject: subject, // Subject line
        text: text, // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
  }
}