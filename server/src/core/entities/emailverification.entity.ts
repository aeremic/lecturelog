export class EmailVerificationEntity {
    public id?: number;

    public userId: number;

    public sentOn: Date;

    public code: string;
}