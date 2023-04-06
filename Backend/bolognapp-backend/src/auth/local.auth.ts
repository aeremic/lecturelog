import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { LoginDto } from "src/core/dtos";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    @Inject(AuthService)
    private authService: AuthService

    constructor(){
        super();
    }

    async validate(loginDto: LoginDto):Promise<any>{
        let user = await this.authService.validateUserCredentials(loginDto);
        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}