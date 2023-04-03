import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { UserEntity } from '../core/entities/user.entity';

@Controller('api/user')
export class UserController {
    @Inject(UserUseCases)
    private readonly userUseCases: UserUseCases

    @Get()
    get(){
        return this.userUseCases.get();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return this.userUseCases.getById(id);
    } 

    @Post()
    create(@Body() userEntity: any): Promise<UserEntity> {
        return this.userUseCases.create(userEntity)
    }
    
    @Put()
    update(@Body() userEntity: any): Promise<UserEntity> {
        return this.userUseCases.update(userEntity)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.userUseCases.delete(id)
    }

    @Get(':firstname')
    getUserByFirstname(@Param('firstname') firstname: any){
        return this.userUseCases.getUserByFirstname(firstname);
    }

}