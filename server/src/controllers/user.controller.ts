import { Body, Controller, Delete, FileTypeValidator, Get, Inject, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { UserEntity } from '../core/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { EmailRegistrationDto } from 'src/core/dtos';
import { SendEmailVerificationDto } from 'src/core/dtos/requests/send-email-verification.dto';
import { CreateUserResponseDto } from 'src/core/dtos/responses/create-user-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadUsersDto } from 'src/core/dtos/responses/upload-users.dto';

@Controller('api/user')
export class UserController {
    @Inject(UserUseCases)
    private readonly userUseCases: UserUseCases

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get()
    get() {
        return this.userUseCases.get();
    }

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('/getById/:id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return this.userUseCases.getById(id);
    }

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Post()
    createOrUpdate(@Body() userEntity: any): Promise<UserEntity> {
        return this.userUseCases.createOrUpdate(userEntity)
    }

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.userUseCases.delete(id)
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
    createUser(@Body() userEntity: any): Promise<CreateUserResponseDto> {
        return this.userUseCases.createUser(userEntity)
    }

    @Post('/sendEmailVerification')
    sendEmailVerification(@Body() sendEmailVerificationDto: SendEmailVerificationDto): Promise<boolean> {
        return this.userUseCases.sendEmailVerification(sendEmailVerificationDto)
    }

    @Post('/emailRegistration')
    emailRegistration(@Body() emailRegistrationDto: EmailRegistrationDto): Promise<boolean> {
        return this.userUseCases.emailRegistration(emailRegistrationDto)
    }

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('/getAllExceptAdmin')
    getAllExceptAdmin() {
        return this.userUseCases.getAllExceptAdmin();
    }

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Post('/uploadUsers')
    @UseInterceptors(FileInterceptor('file'))
    uploadUsers(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 100000 }),
                new FileTypeValidator({ fileType: new RegExp("application\/vnd.ms-excel|csv") }),
            ]
        })
    ) file: Express.Multer.File): Promise<UploadUsersDto> {
        return this.userUseCases.uploadUsers(file);
    }
}