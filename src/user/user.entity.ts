import { hash, compare } from "bcrypt";

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User {
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(props: UserProps) {
    this._name = props.name;
    this._email = props.email;
    this.setPassword(props.password);
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  private async setPassword(password: string): Promise<void> {
    await hash(password, 10);
  }

  static async comparePass(entered: string, hashed: string): Promise<boolean> {
    return await compare(entered, hashed);
  }
}
