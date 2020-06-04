export class User {
  username: string;
  password?: string;
  groupIds: number[];

  constructor(username: string, groupIds: number[], password?: string) {
    this.username = username;
    if (password) {
      this.password = password;
    }
    this.groupIds = groupIds;
  }
}
