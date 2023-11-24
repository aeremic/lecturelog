import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LocalizationEn } from 'src/utils/resources/localization-en.resource';

@Injectable()
export class MailService {
  @Inject()
  private readonly mailerService: MailerService;

  @Inject()
  private readonly config: ConfigService;

  // TODO: Create resource file.
  async sendRegistrationMail(
    id: number,
    email: string,
    firstname: string,
    code: string,
  ) {
    const baseUrl = this.config.get('APP_URL');

    const templatePath = LocalizationEn.registrationTemplatePath;
    const subject = LocalizationEn.registrationEmailSubject;

    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      template: templatePath,
      context: {
        firstname: firstname,
        url: baseUrl + `/emailregistration?id=${id}`,
        code: code,
      },
    });
  }

  // TODO: Create resource file.
  async sendResetPasswordMail(
    id: number,
    email: string,
    firstname: string,
    code: string,
  ) {
    const baseUrl = this.config.get('APP_URL');

    const templatePath = LocalizationEn.passwordResetTemplatePath;
    const subject = LocalizationEn.passwordResetEmailSubject;

    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      template: templatePath,
      context: {
        firstname: firstname,
        url: baseUrl + `/passwordreset?id=${id}`,
        code: code,
      },
    });
  }
}
