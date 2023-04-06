import { Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { UserEntity } from '../core/entities/user.entity';
import { LoginDto, RegisterDto } from "src/core/dtos";
import { JwtService } from "@nestjs/jwt";
import { UserUseCases } from "src/use-cases";

const bcrypt = require('bcrypt');
const saltRounds = 10;
@Injectable()
export class AuthService {
    @Inject(UserUseCases)
    private userUseCases: UserUseCases;

    @Inject(JwtService)
    private jwtService: JwtService;

    // async login(loginDto: LoginDto, userEntity: UserEntity): Promise<any> {
    //     let result = this.validateUser(loginDto, userEntity);
    //     if(result){
    //         return this.generateJwt(userEntity.id, userEntity.firstname)
    //     }
    // }

    async validateUserCredentials(loginDto: LoginDto): Promise<any> {
        this.userUseCases.getUserByEmail(loginDto?.email).then((userResult) => {
            if(!userResult){
                throw new NotAcceptableException('Could not find the user.');
            }
            
            bcrypt.compare(loginDto?.password, userResult?.hash, function (err, compareResult) {
                if (compareResult) {
                    return userResult;
                }
            });
        });
    }

    async login(loginDto: LoginDto): Promise<any> {
        let payload = { email: loginDto.email }

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
    
    async register(registerDto: RegisterDto): Promise<string> {
        return this.hashPassword(registerDto.password);
    }

    private async hashPassword(password: string): Promise<any> {
        bcrypt.hash(password, saltRounds, function (err, result) {
            return result
        });
    }
}