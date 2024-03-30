export class MutualFundDetails {
    fundName: string;
    startDate: string;
    investmentType: string;
    companyName: string;
    investmentAmount: number;
    remark: string;
  
    constructor(
      fundName: string,
      startDate: string,
      investmentType: string,
      companyName: string,
      investmentAmount: number,
      remark: string
    ) {
      this.fundName = fundName;
      this.startDate = startDate;
      this.investmentType = investmentType;
      this.companyName = companyName;
      this.investmentAmount = investmentAmount;
      this.remark = remark;
    }
  }
  