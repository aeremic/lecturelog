import { Injectable } from "@nestjs/common";
import { UserEntity } from '../core/entities/user.entity';
import { LoginDto, RegisterDto } from "src/core/dtos";

const bcrypt = require('bcrypt');
const saltRounds = 10;
@Injectable()
export class AuthService {
    async login(loginDto: LoginDto, userEntity: UserEntity): Promise<any> {
        bcrypt.compare(loginDto?.password, userEntity?.hash, function(err, result) {
            if(result) {
                return this.authService.generateJwt(userEntity);
            }
        });
    }

    async register(registerDto: RegisterDto): Promise<string> {
        return this.hashPassword(registerDto.password);
    }

    private async generateJwt(userEntity: UserEntity): Promise<any>{
        
    }

    private async hashPassword(password: string): Promise<any> {
        bcrypt.hash(password, saltRounds, function(err, result){
            return result
        });
    }
}