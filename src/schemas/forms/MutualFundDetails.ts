export class MutualFundDetails {
    name: string;
    startDate: string;
    investmentType: string;
    companyName: string;
    investmentAmount: number;
    remark: string;
  
    constructor(
      name: string,
      startDate: string,
      investmentType: string,
      companyName: string,
      investmentAmount: number,
      remark: string
    ) {
      this.name = name;
      this.startDate = startDate;
      this.investmentType = investmentType;
      this.companyName = companyName;
      this.investmentAmount = investmentAmount;
      this.remark = remark;
    }
  }
  