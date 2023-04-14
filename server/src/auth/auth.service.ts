import { Inject, Injectable, NotAcceptableException, Body } from '@nestjs/common';
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

    async validateUserCredentials(email: string, password: string): Promise<UserEntity> {
        let user = new Promise<UserEntity>((resolve, reject) => {
            if (email && password) {
                this.userUseCases.getByEmail(email).then((user) => {
                    if (this.userUseCases.isFound(user)) {
                        this.checkPasswordHash(password, user.hash).then((res) => {
                            resolve(res);
                        });
                    } else {
                        reject();
                    }
                });
            } else {
                reject();
            }
        });

        return user;
    }

    async login(req: any): Promise<any> {
        let result = new Promise((resolve, reject) => {
            if (req && req.body && req.body.email) {
                this.userUseCases.getByEmail(req.body.email).then((user) => {
                    if (this.userUseCases.isFound(user)) {
                        let payload = { id: user.id, role: user.role }

                        resolve({
                            accessToken: this.jwtService.sign(payload)
                        });
                    }
                });
            } else {
                reject();
            }
        });

        return result;
    }

    //#endregion

    //#region Registration implementation

    async register(registerDto: RegisterDto): Promise<boolean> {
        let result: boolean = false;

        if (registerDto && registerDto.email && registerDto.password) {
            let userInDb = await this.userUseCases.getByEmail(registerDto.email);

            if (!this.userUseCases.isFound(userInDb)) {
                let hashedPassword = await this.hashPassword(registerDto.password);

                let userEntity: UserEntity = {
                    firstname: registerDto.firstname,
                    lastname: registerDto.lastname,
                    email: registerDto.email,
                    hash: hashedPassword,
                    role: registerDto.role
                };

                if (await this.userUseCases.create(userEntity)) {
                    result = true;
                }
            }
        }

        return result;
    }

    //#endregion

    //#region Private implementation

    private async checkPasswordHash(password: string, hash: string): Promise<any> {
        let res = await bcrypt.compare(password, hash);

        return res;
    }

    private async hashPassword(password: string): Promise<string> {
        let res = await bcrypt.hash(password, saltRounds);

        return res;
    }

    //#endregion
}