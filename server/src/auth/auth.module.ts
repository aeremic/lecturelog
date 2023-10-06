import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../use-cases/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BcryptModule } from 'src/services/cryptography/bcrypt.module';

@Module({
  imports: [
    BcryptModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'ZXJlbWl4',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
