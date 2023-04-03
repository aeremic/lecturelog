export class UserEntity {
  public id: number;

  public firstname: string;
  
  public lastname: string;
  
  public email: string;
  
  public hash?: string;
  
  public salt?: string;
  
  public userType: number

  constructor(o: Object) {
    Object.assign(this, o);
  }
}
