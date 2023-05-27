import { RoleEnum } from 'src/core/common/enums/role.enum';
import { UserEntity } from '../../../core/entities/user.entity';
import { User } from '../models/user.model';

export class UserMapper {

    public static ToEntity(userModel: User): UserEntity {
        let userEntity: UserEntity = {
            id: userModel?.id,
            firstname: userModel?.firstname,
            lastname: userModel?.lastname,
            email: userModel?.email,
            index: userModel?.index,
            year: userModel?.year,
            hash: userModel?.hash
        };

        userEntity.role = userEntity.id ? this.getRoleEnum(userModel?.role) : undefined;

        return userEntity;
    }

    public static ToEntities(userModels: User[]): UserEntity[] {
        let userEntities: UserEntity[];
        if (userModels && userModels.length > 0) {
            userEntities = userModels.map(userModel => {
                return this.ToEntity(userModel);
            });
        }

        return userEntities;
    }

    public static ToModel(userEntity: UserEntity): User {
        let userType: number = 0;

        userType = this.getType(userEntity?.role);

        let userModel: User = {
            id: userEntity?.id,
            firstname: userEntity?.firstname,
            lastname: userEntity?.lastname,
            email: userEntity?.email,
            index: userEntity?.index,
            year: userEntity?.year,
            hash: userEntity?.hash,
            role: userType,

            studentsSubjects: null,
            professorsSubjects: null
        };

        return userModel;
    }

    public static getRoleEnum(type: number | null): RoleEnum {
        switch (type) {
            case 0:
                return RoleEnum.admin;
            case 1:
                return RoleEnum.professor;
            case 2:
            default:
                return RoleEnum.student;
        }
    }

    public static getType(role: RoleEnum | null): number {
        switch (role) {
            case RoleEnum.admin:
                return 0;
            case RoleEnum.professor:
                return 1;
            case RoleEnum.student:
            default:
                return 3;
        }
    }
}