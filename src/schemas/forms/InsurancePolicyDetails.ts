export class InsurancePolicyDetails {
    name: string;
    startDate: string;
    policyNumber: string;
    planType: string;
    companyName: string;
    planName: string;
    paymentMode: string;
    premiumAmount: number;
    sumAssured: number;
    premiumPayTerm: number;
    policyTerm: number;
    maturityDate: string;
    remark: string;
  
    constructor(
      name: string,
      startDate: string,
      policyNumber: string,
      planType: string,
      companyName: string,
      planName: string,
      paymentMode: string,
      premiumAmount: number,
      sumAssured: number,
      premiumPayTerm: number,
      policyTerm: number,
      maturityDate: string,
      remark: string
    ) {
      this.name = name;
      this.startDate = startDate;
      this.policyNumber = policyNumber;
      this.planType = planType;
      this.companyName = companyName;
      this.planName = planName;
      this.paymentMode = paymentMode;
      this.premiumAmount = premiumAmount;
      this.sumAssured = sumAssured;
      this.premiumPayTerm = premiumPayTerm;
      this.policyTerm = policyTerm;
      this.maturityDate = maturityDate;
      this.remark = remark;
    }
  }
  