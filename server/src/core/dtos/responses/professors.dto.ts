import { UserEntity } from "../../entities/user.entity";

export class ProfessorsDto {
    public professors: UserEntity[] | PromiseLike<UserEntity[]>;
    public count: number | PromiseLike<number>;
}