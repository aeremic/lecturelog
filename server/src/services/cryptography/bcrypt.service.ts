import { Injectable } from "@nestjs/common";

const bcrypt = require('bcrypt');
const saltRounds = 10;
@Injectable()
export class BcryptService {

    async createUserPassword(password: string, repeatedPassword: string): Promise<string | boolean> {
        return (password === repeatedPassword) && this.hashPassword(password);
    }

    async checkPasswordHash(password: string, hash: string): Promise<any> {
        let res = await bcrypt.compare(password, hash);

        return res;
    }

    async hashPassword(password: string): Promise<string> {
        let res = await bcrypt.hash(password, saltRounds);

        return res;
    }
}