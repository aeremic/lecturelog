import { MailerService } from "@nestjs-modules/mailer";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    @Inject()
    private readonly mailerService: MailerService;

    @Inject()
    private readonly config: ConfigService;

    // TODO: Create resource file.
    async sendRegistrationMail(id: number, email: string, firstname: string, code: string) {
        let baseUrl = this.config.get("APP_URL");
        let templatePath = './utils/templates/registration';
        let subject = "BolognApp - New Registration";

        await this.mailerService.sendMail({
            to: email,
            subject: subject,
            template: templatePath,
            context: {
                firstname: firstname,
                url: baseUrl + `/register?=${id}`,
                code: code
            }
        })
    }
}