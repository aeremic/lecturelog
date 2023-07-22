import { UserEntity } from "src/core/entities";

export class AllUsersExceptAdminDto {
    public professors: UserEntity[] | PromiseLike<UserEntity[]>;
    public students: UserEntity[] | PromiseLike<UserEntity[]>;
}