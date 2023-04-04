import { Injectable } from "@nestjs/common";
import { UserEntity } from '../core/entities/user.entity';
import { LoginDto, RegisterDto } from "src/core/dtos";

const bcrypt = require('bcrypt');
const saltRounds = 10;
@Injectable()
export class AuthService {
    async login(loginDto: LoginDto, userEntity: UserEntity): Promise<any> {
        let match = await bcrypt.compare(loginDto?.password, userEntity?.hash);

        return match;
    }
    
    async generateJwt(userEntity: UserEntity): Promise<any>{
        
    }

    async register(registerDto: RegisterDto): Promise<string> {
        return await this.hashPassword(registerDto.password);
    }

    async hashPassword(password: string): Promise<any> {
        bcrypt.hash(password, saltRounds, function(err, result){
            return result
        });
    }
}