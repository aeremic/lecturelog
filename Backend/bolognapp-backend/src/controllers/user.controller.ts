import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { UserEntity } from '../core/entities/user.entity';

@Controller('api/user')
export class UserController {
    @Inject(UserUseCases)
    private readonly userUseCases: UserUseCases

    @Get()
    getAll(){
        return this.userUseCases.get();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return this.userUseCases.getUserById(id);
    } 

    // @Get(':firstname')
    // getUserByFirstname(@Param('firstname') firstname: any){
    //     return this.userUseCases.getUserByFirstname(firstname);
    // }
}