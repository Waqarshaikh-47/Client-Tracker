export class ClientInformation {
    fullName: string;
    panNumber: string;
    dob: string;
    email: string;
    phone: string;
  
    constructor(fullName: string, panNumber: string, dob: string, email: string, phone: string) {
      this.fullName = fullName;
      this.panNumber = panNumber;
      this.dob = dob;
      this.email = email;
      this.phone = phone;
    }
  }
  