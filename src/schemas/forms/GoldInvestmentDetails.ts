export class GoldInvestmentDetails {
    name: string;
    investmentValue: number;
    quantity: number;
    investmentDate: string;
    goldType: string;
  
    constructor(
      name: string,
      investmentValue: number,
      quantity: number,
      investmentDate: string,
      goldType: string
    ) {
      this.name = name;
      this.investmentValue = investmentValue;
      this.quantity = quantity;
      this.investmentDate = investmentDate;
      this.goldType = goldType;
    }
  }
  