
export class Encoding {
    public static generateRandomPassword(): string {
        return (+new Date).toString(36).slice(-5);
    }

    public static generateRandomCode(): string {
        return (+new Date).toString(36).slice(-5).toUpperCase();
    }
}