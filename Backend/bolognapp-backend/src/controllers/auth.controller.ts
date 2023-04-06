import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services';
import { UserUseCases } from 'src/use-cases';

@Controller('api/auth')
export class AuthController {
    @Inject(AuthService)
    private readonly authService: AuthService

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Body() loginDto: any): Promise<any>{
        return this.authService.login(loginDto);
    }
}