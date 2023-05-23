import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { UserEntity } from '../core/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('api/user')
export class UserController {
    @Inject(UserUseCases)
    private readonly userUseCases: UserUseCases

    // @Roles('admin')
    // @UseGuards(RoleGuard)
    @Get()
    get() {
        return this.userUseCases.get();
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return this.userUseCases.getById(id);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Post()
    create(@Body() userEntity: any): Promise<UserEntity> {
        return this.userUseCases.create(userEntity)
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Put()
    update(@Body() userEntity: any): Promise<UserEntity> {
        return this.userUseCases.update(userEntity)
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
}