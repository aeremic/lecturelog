
export class Encoding {
    public static generateRandomPassword(): string {
        return (+new Date).toString(36).slice(-5);
    }
}