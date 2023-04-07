import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth';

@Controller('api/auth')
export class AuthController {
    @Inject(AuthService)
    private readonly authService: AuthService

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() loginDto: any): Promise<any>{
        return this.authService.login(loginDto);
    }
}