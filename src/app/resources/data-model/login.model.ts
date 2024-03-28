export class LoginCredentialModel{

  public username!: string;
  public password!: string;
  public name!: string;
  public email!: string;

  constructor(initial?: Partial<LoginCredentialModel>) {
    Object.assign(this, initial);
  }
}
