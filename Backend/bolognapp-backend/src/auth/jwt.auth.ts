import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from '../services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { LoginDto } from '../core/dtos/login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET_KEY'
        });
    }

    async validate(payload: any) {
        return { email: payload.email };
    }
}