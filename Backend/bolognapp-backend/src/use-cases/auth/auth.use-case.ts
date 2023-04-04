import { Inject, Injectable } from "@nestjs/common";
import { LoginDto, RegisterDto } from "src/core/dtos";
import { UserUseCases } from "../user/user.use-case";
import { AuthService } from "src/services";

@Injectable()
export class AuthUseCases {
    @Inject(UserUseCases)
    private readonly userUseCases: UserUseCases

    @Inject(AuthService)
    private readonly authService: AuthService;

    async login(loginDto: LoginDto): Promise<any> {
        this.userUseCases.getUserByEmail(loginDto?.email).then((res) => {
            return this.authService.login(loginDto, res);
        });
    }

    async register(registerDto: RegisterDto): Promise<any> {

    }
}