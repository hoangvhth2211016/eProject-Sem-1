export class Contact {
  id: string;
  username: string;
  email: string;
  title: string;
  detail: string;
  createdAt: string;

  constructor(id: string, username: string, email: string, title: string, detail: string, createdAt: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.title = title;
    this.detail = detail;
    this.createdAt = createdAt;
  }
}
