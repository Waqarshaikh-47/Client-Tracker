export class IndiaPostOfficeDetails {
    name: string;
    annualInterestRate: number;
    startDate: string;
    tenureEndDate: string;
    compoundingFrequency: string;
  
    constructor(
      name: string,
      annualInterestRate: number,
      startDate: string,
      tenureEndDate: string,
      compoundingFrequency: string
    ) {
      this.name = name;
      this.annualInterestRate = annualInterestRate;
      this.startDate = startDate;
      this.tenureEndDate = tenureEndDate;
      this.compoundingFrequency = compoundingFrequency;
    }
  }
  