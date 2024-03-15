export class User {
    displayName: string;
    email: string;
    roles: string[];

    constructor(displayName: string, email: string, roles: string[]) {
      this.displayName = displayName;
      this.email = email;
      this.roles = roles;
    }
  }
  