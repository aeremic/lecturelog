import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthService)
    private readonly authService: AuthService

    constructor() {
        super({ usernameField: 'email', passwordField: 'password' });
    }

    validate(email: any, password: any): Promise<any> {
        let result = new Promise<any>((resolve, reject) => {
            this.authService.validateUserCredentials(email, password).then((res) => {
                resolve(res);
            }).catch((err) => {
                // log error
                reject();
            });
        })

        return result;
    }
}