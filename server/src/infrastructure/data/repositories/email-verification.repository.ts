import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailVerification } from "../models";
import { EmailVerificationEntity } from "src/core/entities";
import { EmailVerificationRepositoryAbstract } from "src/core/abstracts/repositories/email-verification.repository.abstract";
import { EmailVerificationMapper } from "../mappers/emailverification.mapper";

export class EmailVerificationRepository implements EmailVerificationRepositoryAbstract {
    @InjectRepository(EmailVerification)
    private readonly emailVerificationModelRepository: Repository<EmailVerification>

    //#region Implementation of Base repository   

    async get(): Promise<EmailVerificationEntity[]> {
        let result = await this.emailVerificationModelRepository.find();

        return EmailVerificationMapper.ToEntities(result);
    }

    async getById(id: number): Promise<EmailVerificationEntity> {
        let result = await this.emailVerificationModelRepository.findOneBy({ id: id })

        return EmailVerificationMapper.ToEntity(result);
    }

    async createOrUpdate(EmailVerificationEntity: EmailVerificationEntity): Promise<EmailVerificationEntity> {
        let EmailVerificationModel: EmailVerification = EmailVerificationMapper.ToModel(EmailVerificationEntity);
        let result = await this.emailVerificationModelRepository.save(EmailVerificationModel);

        return EmailVerificationMapper.ToEntity(result);
    }

    async delete(id: number): Promise<number> {
        let result = await this.emailVerificationModelRepository.delete({ id: id });

        return result.affected;
    }

    //#endregion

    async getLatestEmailVerificationByUserId(userId: number, code: string): Promise<EmailVerificationEntity> {
        let result = await this.emailVerificationModelRepository.findOne({
            where: { userId: userId, code: code, expired: false }, order: { sentOn: "DESC" }
        })

        return EmailVerificationMapper.ToEntity(result);
    }

    async getPreviousEmailValidation(email: string): Promise<EmailVerificationEntity> {
        let result = await this.emailVerificationModelRepository.findOne({
            where: { email: email, expired: false }
        })

        return EmailVerificationMapper.ToEntity(result);
    }
}