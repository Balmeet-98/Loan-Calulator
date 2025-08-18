// Loan calculation utilities

export interface LoanInputs {
  principal: number;
  interestRate: number;
  tenure: number;
  downPayment?: number;
  processingFee?: number;
  prepaymentAmount?: number;
  prepaymentMonth?: number;
}

export interface LoanResult {
  emi: number;
  totalInterest: number;
  totalAmount: number;
  amortizationSchedule: AmortizationRow[];
}

export interface AmortizationRow {
  month: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

// Calculate EMI using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
export function calculateEMI(principal: number, interestRate: number, tenure: number): number {
  if (principal <= 0 || interestRate <= 0 || tenure <= 0) return 0;
  
  const monthlyRate = interestRate / (12 * 100);
  const numberOfPayments = tenure * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
              (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(emi * 100) / 100;
}

// Calculate total interest paid
export function calculateTotalInterest(emi: number, principal: number, tenure: number): number {
  const totalAmount = emi * tenure * 12;
  return Math.round((totalAmount - principal) * 100) / 100;
}

// Generate amortization schedule
export function generateAmortizationSchedule(inputs: LoanInputs): AmortizationRow[] {
  const { principal, interestRate, tenure, prepaymentAmount, prepaymentMonth } = inputs;
  const emi = calculateEMI(principal, interestRate, tenure);
  const monthlyRate = interestRate / (12 * 100);
  const schedule: AmortizationRow[] = [];
  
  let remainingBalance = principal;
  
  for (let month = 1; month <= tenure * 12; month++) {
    const interestPaid = remainingBalance * monthlyRate;
    let principalPaid = emi - interestPaid;
    
    // Apply prepayment if specified
    if (prepaymentAmount && prepaymentMonth && month >= prepaymentMonth && remainingBalance > 0) {
      const maxPrepayment = Math.min(prepaymentAmount, remainingBalance - principalPaid);
      principalPaid += maxPrepayment;
    }
    
    // Ensure we don't overpay
    if (principalPaid > remainingBalance) {
      principalPaid = remainingBalance;
    }
    
    remainingBalance -= principalPaid;
    
    schedule.push({
      month,
      emi: Math.round((emi + (prepaymentAmount && prepaymentMonth && month >= prepaymentMonth ? prepaymentAmount : 0)) * 100) / 100,
      principalPaid: Math.round(principalPaid * 100) / 100,
      interestPaid: Math.round(interestPaid * 100) / 100,
      remainingBalance: Math.max(0, Math.round(remainingBalance * 100) / 100)
    });
    
    if (remainingBalance <= 0) break;
  }
  
  return schedule;
}

// Calculate loan with prepayment
export function calculateLoanWithPrepayment(inputs: LoanInputs): LoanResult {
  const { principal, interestRate, tenure, prepaymentAmount, prepaymentMonth } = inputs;
  
  // Calculate original EMI
  const originalEMI = calculateEMI(principal, interestRate, tenure);
  
  // Generate amortization schedule
  const schedule = generateAmortizationSchedule(inputs);
  
  // Calculate totals
  const totalAmount = schedule.reduce((sum, row) => sum + row.emi, 0);
  const totalInterest = totalAmount - principal;
  
  return {
    emi: originalEMI,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    amortizationSchedule: schedule
  };
}

// Calculate car loan with down payment
export function calculateCarLoan(inputs: LoanInputs): LoanResult {
  const { principal, downPayment = 0, interestRate, tenure } = inputs;
  const loanAmount = principal - downPayment;
  
  if (loanAmount <= 0) {
    return {
      emi: 0,
      totalInterest: 0,
      totalAmount: principal,
      amortizationSchedule: []
    };
  }
  
  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalInterest = calculateTotalInterest(emi, loanAmount, tenure);
  const totalAmount = emi * tenure * 12;
  
  return {
    emi,
    totalInterest,
    totalAmount: totalAmount + downPayment,
    amortizationSchedule: generateAmortizationSchedule({
      ...inputs,
      principal: loanAmount
    })
  };
}

// Calculate home loan with processing fee
export function calculateHomeLoan(inputs: LoanInputs): LoanResult {
  const { principal, interestRate, tenure, processingFee = 0 } = inputs;
  
  const emi = calculateEMI(principal, interestRate, tenure);
  const totalInterest = calculateTotalInterest(emi, principal, tenure);
  const totalAmount = emi * tenure * 12;
  
  return {
    emi,
    totalInterest,
    totalAmount: totalAmount + processingFee,
    amortizationSchedule: generateAmortizationSchedule(inputs)
  };
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

// Validate loan inputs
export function validateLoanInputs(inputs: LoanInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (inputs.principal <= 0) {
    errors.push('Principal amount must be greater than 0');
  }
  
  if (inputs.interestRate <= 0 || inputs.interestRate > 100) {
    errors.push('Interest rate must be between 0 and 100');
  }
  
  if (inputs.tenure <= 0 || inputs.tenure > 50) {
    errors.push('Tenure must be between 1 and 50 years');
  }
  
  if (inputs.downPayment && inputs.downPayment >= inputs.principal) {
    errors.push('Down payment must be less than principal amount');
  }
  
  if (inputs.processingFee && inputs.processingFee < 0) {
    errors.push('Processing fee cannot be negative');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
