import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
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

    // @Get(':firstname')
    // getUserByFirstname(@Param('firstname') firstname: any){
    //     return this.userUseCases.getUserByFirstname(firstname);
    // }
}