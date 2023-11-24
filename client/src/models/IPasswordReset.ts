export interface IPasswordReset {
  userId: number;
  code: string;
  password: string;
  repeatedPassword: string;
}
