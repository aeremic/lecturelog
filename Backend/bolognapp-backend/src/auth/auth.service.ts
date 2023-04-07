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

    //#region Login implementation

    validateUserCredentials(email: string, password: string): Promise<UserEntity> {
        let user = new Promise<UserEntity>((resolve, reject) =>{
            this.userUseCases.getUserByEmail(email).then((user) => {                
                this.checkPasswordHash(password, user?.hash).then((res) => {
                    if(res){
                        resolve(user);
                    } 
                    
                    reject(null);
                })
            });
        });

        return user;
    }

    login(userEntity: any): Promise<any> {
        let result = new Promise((resolve, reject) => {
            let payload = { email: userEntity.email }

            resolve({
                id: userEntity.id,
                accessToken: this.jwtService.sign(payload)
            });
        });

        return result;
    }

    //#endregion
    
    //#region Registration implementation

    register(registerDto: RegisterDto): Promise<string> {
        return this.hashPassword(registerDto.password);
    }

    //#endregion

    //#region Private implementation

    private async checkPasswordHash(password: string, hash: string): Promise<any>{
        bcrypt.compare(password, hash, function (err, res) {
            return res;
        });
    }
    
    private async hashPassword(password: string): Promise<any> {
        bcrypt.hash(password, saltRounds, function (err, result) {
            return result
        });
    }
    
    //#endregion
}