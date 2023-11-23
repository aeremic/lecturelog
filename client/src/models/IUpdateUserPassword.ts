export interface IUpdateUserPassword {
  id: number;
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
}
