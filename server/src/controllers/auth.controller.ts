import { BadRequestException, Body, Controller, Inject, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth';
import { LoginDto, RegisterDto } from 'src/core/dtos';

@Controller('api/auth')
export class AuthController {
    @Inject(AuthService)
    private readonly authService: AuthService

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() loginDto: LoginDto): Promise<any> {
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<any> {
        return this.authService.register(registerDto).then((res) => {
            if (!res) {
                throw new BadRequestException("User not registered!");
            }
        });
    }
}