import { Module } from "@nestjs/common";
import { AuthController } from "src/controllers/auth.controller";
import { UserUseCases } from "../use-cases/user/user.use-case";
import { UserRepositoryAbstract } from "src/core/abstracts/repositories/user.repository.abstract";
import { UserRepository } from "src/infrastructure/implementations/repositories/user.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from "../use-cases/user/user.module";
import { JwtStrategy } from "src/auth/jwt.auth";
import { LocalStrategy } from "../auth/local.auth";
import { AuthService } from "./auth.service";

@Module({
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: 'SECRET_KEY',
        signOptions: { expiresIn: '60s' },
    })],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }