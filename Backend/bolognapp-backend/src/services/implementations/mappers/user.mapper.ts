import { UserEntity } from '../../../core/entities/user.entity';
import { User } from '../models/user.model';
export class UserMapper {
    
    public static ToEntity(userModel: User): UserEntity {
        let userEntity: UserEntity = {
            id: userModel?.id,
            firstname: userModel?.firstname,
            lastname: userModel?.lastname,
            email: userModel?.email,
            userType: userModel?.userType
        };

        return userEntity;
    }

    //.toDomain(); map UserModel to UserEntity and return it
    public static ToEntities(userModels: User[]): UserEntity[] {
        return null;
    }

    public static ToModel(userEntity: UserEntity): User {
        let userModel: User = {
            id: userEntity?.id,
            firstname: userEntity?.firstname,
            lastname: userEntity?.lastname,
            email: userEntity?.email,
            hash: userEntity?.hash,
            salt: userEntity?.salt,
            userType: userEntity?.userType,
            studentsSubjects: null,
            professorsSubjects: null
        };

        return userModel;
    }
}