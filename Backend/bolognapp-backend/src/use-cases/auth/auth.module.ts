import { Module } from "@nestjs/common";
import { AuthController } from "src/controllers/auth.controller";
import { AuthService } from "src/services";
import { UserUseCases } from "../user/user.use-case";
import { UserRepositoryAbstract } from "src/core/abstracts/repositories/user.repository.abstract";
import { UserRepository } from "src/infrastructure/implementations/repositories/user.repository";

@Module({
    imports: [],
    providers: [
        UserUseCases,
        {
            provide: UserRepositoryAbstract,
            useClass: UserRepository
        },
        AuthService
    ],
    controllers: [AuthController]
})
export class AuthModule { }