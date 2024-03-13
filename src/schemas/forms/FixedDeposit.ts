export class FixedDepositDetails {
    name: string;
    investmentAmount: number;
    annualInterestRate: number;
    startDate: string;
    tenure: number;
  
    constructor(
      name: string,
      investmentAmount: number,
      annualInterestRate: number,
      startDate: string,
      tenure: number
    ) {
      this.name = name;
      this.investmentAmount = investmentAmount;
      this.annualInterestRate = annualInterestRate;
      this.startDate = startDate;
      this.tenure = tenure;
    }
  }