export class Msg {
  private from: string;
  private date: Date;
  private type: string;
  public content: string;

  constructor(from: string, message: any) {
    this.from = from;
    this.date = new Date();
    this.type = message["type"];
    this.content = this.type === "text" ? message["text"] : message["url"];
  }

  public get when() {
    return this.date.toLocaleTimeString().substring(0, 5);
  }
  public get isImg(): boolean {
    return this.type !== "text";
  }
  public get isBot(): boolean {
    return this.from === "BOT";
  }
  public get isUser(): boolean {
    return this.from === "USER";
  }
}
