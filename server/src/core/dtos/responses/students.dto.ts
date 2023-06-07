import { UserEntity } from "../../entities/user.entity";

export class StudentsDto {
    public students: UserEntity[] | PromiseLike<UserEntity[]>;
    public count: number | PromiseLike<number>;
}