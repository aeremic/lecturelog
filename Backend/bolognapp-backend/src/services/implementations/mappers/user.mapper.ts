import { UserEntity } from '../../../core/entities/user.entity';
import { User } from '../models/user.model';
export class UserMapper {
    
    public static ToEntity(userModel: User): UserEntity {
        let user: User = {
            id: userModel?.id,
            firstname: userModel?.firstname
        };

        return user;
    }

    //.toDomain(); map UserModel to UserEntity and return it
    public static ToEntities(userModels: User[]): UserEntity[] {
        return null;
    }

    public static ToModel(userEntity: UserEntity): User {
        return new User();
    }
}