import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
const saltRounds = 10;
@Injectable()
export class BcryptService {
  async createUserPassword(
    password: string,
    repeatedPassword: string,
  ): Promise<string | boolean> {
    return password === repeatedPassword && this.hashPassword(password);
  }

  async checkPasswordHash(password: string, hash: string): Promise<any> {
    return await bcrypt.compare(password, hash);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }
}
