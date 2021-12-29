export class Post {
  constructor(private _author: string, private _content: string) {}

  public get author(): string {
    return this._author;
  }

  public get content(): string {
    return this._content;
  }
}
