import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { UserEntity } from '../core/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import {
  EmailRegistrationDto,
  UpdateUserPasswordResponseDto,
} from 'src/core/dtos';
import { SendEmailVerificationDto } from 'src/core/dtos/requests/send-email-verification.dto';
import { CreateUpdateUserResponseDto } from 'src/core/dtos/responses/create-update-user-response.dto';
import { SendPasswordResetEmailResponseDto } from 'src/core/dtos/responses/send-password-reset-email.dto';
import { ResetPasswordResponseDto } from 'src/core/dtos/responses/reset-password.dto';
import { GetUserDataDto } from 'src/core/dtos/responses/get-user-data.dto';

@Controller('api/user')
export class UserController {
  @Inject(UserUseCases)
  private readonly userUseCases: UserUseCases;

  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  get() {
    return this.userUseCases.get();
  }

  @Roles('admin', 'professor', 'student')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/getById/:id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userUseCases.getById(id);
  }

  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
  createOrUpdate(@Body() userEntity: any): Promise<UserEntity> {
    return this.userUseCases.createOrUpdate(userEntity);
  }

  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.userUseCases.delete(id);
  }

  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/getbyfirstname/:firstname')
  getByFirstname(@Param('firstname') firstname: any) {
    return this.userUseCases.getByFirstname(firstname);
  }

  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post('/createUser')
  createUser(@Body() userEntity: any): Promise<CreateUpdateUserResponseDto> {
    return this.userUseCases.createUser(userEntity);
  }

  @Post('/sendEmailVerification')
  sendEmailVerification(
    @Body() sendEmailVerificationDto: SendEmailVerificationDto,
  ): Promise<boolean> {
    return this.userUseCases.sendEmailVerification(sendEmailVerificationDto);
  }

  @Post('/emailRegistration')
  emailRegistration(
    @Body() emailRegistrationDto: EmailRegistrationDto,
  ): Promise<boolean> {
    return this.userUseCases.emailRegistration(emailRegistrationDto);
  }

  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/getAllExceptAdmin')
  getAllExceptAdmin() {
    return this.userUseCases.getAllExceptAdmin();
  }

  @Roles('admin', 'professor', 'student')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post('/updateUser')
  updateUser(@Body() userEntity: any): Promise<CreateUpdateUserResponseDto> {
    return this.userUseCases.updateUser(userEntity);
  }

  @Roles('admin', 'professor', 'student')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post('/updateUserPassword')
  updateUserPassword(
    @Body() request: any,
  ): Promise<UpdateUserPasswordResponseDto> {
    return this.userUseCases.updateUserPassword(request);
  }

  @Post('/sendPasswordResetEmail')
  sendPasswordResetEmail(
    @Body() request: any,
  ): Promise<SendPasswordResetEmailResponseDto> {
    return this.userUseCases.sendPasswordResetEmail(request);
  }

  @Post('/resetPassword')
  resetPassword(@Body() request: any): Promise<ResetPasswordResponseDto> {
    return this.userUseCases.resetPassword(request);
  }

  @Roles('admin', 'professor', 'student')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/getUserData/:id')
  getUserData(@Param('id', ParseIntPipe) id: number): Promise<GetUserDataDto> {
    return this.userUseCases.getUserData(id);
  }
}
