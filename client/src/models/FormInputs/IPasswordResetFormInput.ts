export interface IPasswordResetFormInput {
  userId: number;
  code: string;
  password: string;
  repeatedPassword: string;
}
