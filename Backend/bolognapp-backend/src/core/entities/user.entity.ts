export class UserEntity {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash?: string;
  salt?: string;
  userType: number
}
