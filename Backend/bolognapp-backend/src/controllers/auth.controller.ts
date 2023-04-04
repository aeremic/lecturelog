import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { AuthUseCases } from 'src/use-cases/auth/auth.use-case';

@Controller('api/auth')
export class AuthController {
    @Inject(UserUseCases)
    private readonly authUseCases: AuthUseCases

    @Post('login')
    login(@Body() loginDto: any): Promise<any>{
        return this.authUseCases.login(loginDto);
    }
}