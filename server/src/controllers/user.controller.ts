import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { UserEntity } from '../core/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { EmailRegistrationDto } from 'src/core/dtos';

@UseGuards(AuthGuard('jwt'))
@Controller('api/user')
export class UserController {
    @Inject(UserUseCases)
    private readonly userUseCases: UserUseCases

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get()
    get() {
        return this.userUseCases.get();
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/getById/:id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return this.userUseCases.getById(id);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Post()
    createOrUpdate(@Body() userEntity: any): Promise<UserEntity> {
        return this.userUseCases.createOrUpdate(userEntity)
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.userUseCases.delete(id)
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/getbyfirstname/:firstname')
    getByFirstname(@Param('firstname') firstname: any) {
        return this.userUseCases.getByFirstname(firstname);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Post('/createUser')
    createUser(@Body() userEntity: any): Promise<UserEntity> {
        return this.userUseCases.createUser(userEntity)
    }

    @Roles('admin', 'professor', 'student')
    @UseGuards(RoleGuard)
    @Post('/emailRegistration')
    emailRegistration(@Body() emailRegistrationDto: EmailRegistrationDto): Promise<boolean> {
        return this.userUseCases.emailRegistration(emailRegistrationDto)
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/getAllExceptAdmin')
    getAllExceptAdmin() {
        return this.userUseCases.getAllExceptAdmin();
    }
}