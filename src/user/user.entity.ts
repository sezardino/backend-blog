import { hash, compare } from "bcrypt";

export class User {
  private _password: string;

  constructor(private _name: string, private _email: string) {}

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  async setPassword(password: string): Promise<string> {
    return (this._password = await hash(password, 10));
  }

  static async comparePass(entered: string, hashed: string): Promise<boolean> {
    return await compare(entered, hashed);
  }
}
