import { Roles } from 'src/core/common/enums/roles.enum';
import { UserEntity } from '../../../core/entities/user.entity';
import { User } from '../models/user.model';

export class UserMapper {

    public static ToEntity(userModel: User): UserEntity {
        let userEntity: UserEntity = {
            id: userModel?.id,
            firstname: userModel?.firstname,
            lastname: userModel?.lastname,
            email: userModel?.email,
            hash: userModel?.hash
        };

        if (userModel?.userType) {
            switch (userModel.userType) {
                case 0:
                    userEntity.role = Roles.admin
                    break;
                case 1:
                    userEntity.role = Roles.professor
                    break;
                case 2:
                    userEntity.role = Roles.student
                    break;
                default:
                    userEntity.role = Roles.student
                    break;
            }
        }

        return userEntity;
    }

    public static ToEntities(userModels: User[]): UserEntity[] {
        let userEntities: any[];
        if(userModels && userModels.length > 0){
            userEntities = userModels.map(userModel => {
                return this.ToEntity(userModel);
            });
        }

        return userEntities;
    }

    public static ToModel(userEntity: UserEntity): User {
        let userType: number = 0;
        
        if (userEntity?.role) {
            switch (userEntity.role) {
                case Roles.admin:
                    userType = 0
                    break;
                case Roles.professor:
                    userType = 1
                    break;
                case Roles.student:
                    userType = 3
                    break;
                default:
                    userType = 3
                    break;
            }
        }

        let userModel: User = {
            id: userEntity?.id,
            firstname: userEntity?.firstname,
            lastname: userEntity?.lastname,
            email: userEntity?.email,
            hash: userEntity?.hash,
            userType: userType,

            studentsSubjects: null,
            professorsSubjects: null
        };

        return userModel;
    }
}