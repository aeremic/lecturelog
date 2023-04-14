import { BadGatewayException, BadRequestException, Body, Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
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

    @Post('register')
    register(@Body() registerDto: any): Promise<any>{
        return this.authService.register(registerDto).then((res) => {
            if(!res){
                throw new BadRequestException("User not registered!");
            }
        });
    }
}