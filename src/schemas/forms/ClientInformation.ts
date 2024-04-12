export class ClientInformation {
    fullName: string;
    panNumber: string;
    dob: string;
    gender:string
    email: string;
    phone: string;
    address: string;
  
    constructor(fullName: string, panNumber: string, dob: string, email: string, phone: string, gender:string, address:string) {
      this.fullName = fullName;
      this.panNumber = panNumber;
      this.dob = dob;
      this.email = email;
      this.phone = phone;
      this.gender = gender;
      this.address = address;
    }
  }
  