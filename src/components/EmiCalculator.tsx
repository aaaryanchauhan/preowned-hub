
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface EmiCalculatorProps {
  carPrice: number;
}

const EmiCalculator: React.FC<EmiCalculatorProps> = ({ carPrice }) => {
  const minLoanAmount = 0;
  const maxLoanAmount = carPrice;
  const minDownPayment = 0;
  const maxDownPayment = carPrice;
  const minMonths = 12;
  const maxMonths = 84;
  const minInterestRate = 5;
  const maxInterestRate = 20;

  const [loanAmount, setLoanAmount] = useState<number>(Math.floor(carPrice * 0.75));
  const [downPayment, setDownPayment] = useState<number>(Math.floor(carPrice * 0.25));
  const [months, setMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [customInterestRate, setCustomInterestRate] = useState<string>("7.5");
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Calculate EMI
  const calculateEmi = () => {
    // Monthly interest rate
    const monthlyRate = interestRate / 12 / 100;
    
    // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emiValue = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    
    setEmi(isNaN(emiValue) ? 0 : Math.round(emiValue));
    
    // Calculate total interest and total amount
    const totalPaid = emiValue * months;
    setTotalInterest(isNaN(totalPaid) ? 0 : Math.round(totalPaid - loanAmount));
    setTotalAmount(isNaN(totalPaid) ? 0 : Math.round(totalPaid));
  };

  // Handle loan amount change
  const handleLoanAmountChange = (value: number[]) => {
    const newLoanAmount = value[0];
    setLoanAmount(newLoanAmount);
    // Ensure total is still car price
    setDownPayment(Math.round(carPrice - newLoanAmount));
  };

  // Handle down payment change
  const handleDownPaymentChange = (value: number[]) => {
    const newDownPayment = value[0];
    setDownPayment(newDownPayment);
    // Ensure total is still car price
    setLoanAmount(Math.round(carPrice - newDownPayment));
  };

  // Handle months change
  const handleMonthsChange = (value: number[]) => {
    setMonths(value[0]);
  };
  
  // Handle interest rate change
  const handleInterestRateChange = (value: number[]) => {
    setInterestRate(value[0]);
    setCustomInterestRate(value[0].toString());
  };

  // Handle custom interest rate input
  const handleCustomInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomInterestRate(value);
    
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue >= minInterestRate && parsedValue <= maxInterestRate) {
      setInterestRate(parsedValue);
    }
  };

  // Apply custom interest rate when input field loses focus
  const handleCustomInterestRateBlur = () => {
    const parsedValue = parseFloat(customInterestRate);
    if (isNaN(parsedValue) || parsedValue < minInterestRate) {
      setInterestRate(minInterestRate);
      setCustomInterestRate(minInterestRate.toString());
    } else if (parsedValue > maxInterestRate) {
      setInterestRate(maxInterestRate);
      setCustomInterestRate(maxInterestRate.toString());
    } else {
      setInterestRate(parsedValue);
    }
  };

  // Recalculate EMI whenever inputs change
  useEffect(() => {
    calculateEmi();
  }, [loanAmount, months, interestRate]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-6">
      <div className="flex items-center">
        <CreditCard className="w-6 h-6 text-[#8B5CF6] mr-2" />
        <h3 className="text-xl font-bold text-[#1A1F2C]">EMI Calculator</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-2">
          <div className="text-gray-500 text-sm">EMI starting from</div>
          <div className="text-5xl font-bold text-[#4EB69C]">
            {formatCurrency(emi)}
            <span className="text-sm font-normal text-gray-500"> per month</span>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-[#E0F7F0] mr-2"></div>
                <span className="text-gray-600">Principal Loan Amount</span>
              </div>
              <span className="font-medium">{formatCurrency(loanAmount)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-[#4EB69C] mr-2"></div>
                <span className="text-gray-600">Total Interest Payable</span>
              </div>
              <span className="font-medium">{formatCurrency(totalInterest)}</span>
            </div>
            
            <div className="flex justify-between text-sm border-t border-gray-100 pt-4 font-semibold">
              <div className="flex items-center">
                <span className="text-gray-800">Total Amount Payable</span>
              </div>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-[#1A1F2C] font-medium">Loan Amount</label>
              <span className="text-[#8B5CF6] font-semibold">{formatCurrency(loanAmount)}</span>
            </div>
            <Slider
              value={[loanAmount]}
              min={minLoanAmount}
              max={maxLoanAmount}
              step={1000}
              onValueChange={handleLoanAmountChange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{formatCurrency(minLoanAmount)}</span>
              <span>{formatCurrency(maxLoanAmount)}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-[#1A1F2C] font-medium">Down Payment<sup>*</sup></label>
              <span className="text-[#8B5CF6] font-semibold">{formatCurrency(downPayment)}</span>
            </div>
            <Slider
              value={[downPayment]}
              min={minDownPayment}
              max={maxDownPayment}
              step={1000}
              onValueChange={handleDownPaymentChange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{formatCurrency(minDownPayment)}</span>
              <span>{formatCurrency(maxDownPayment)}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-[#1A1F2C] font-medium">Interest Rate (%)</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={customInterestRate}
                  onChange={handleCustomInterestRateChange}
                  onBlur={handleCustomInterestRateBlur}
                  className="text-[#8B5CF6] font-semibold w-12 bg-transparent text-right border-b border-gray-200 focus:outline-none focus:border-primary"
                />
                <span className="text-[#8B5CF6] font-semibold">%</span>
              </div>
            </div>
            <Slider
              value={[interestRate]}
              min={minInterestRate}
              max={maxInterestRate}
              step={0.1}
              onValueChange={handleInterestRateChange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{minInterestRate}%</span>
              <span>{maxInterestRate}%</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-[#1A1F2C] font-medium">Duration of Loan</label>
              <span className="text-[#8B5CF6] font-semibold">{months} Months</span>
            </div>
            <Slider
              value={[months]}
              min={minMonths}
              max={maxMonths}
              step={6}
              onValueChange={handleMonthsChange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{minMonths} Months</span>
              <span>{maxMonths} Months</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 space-y-4">
            <p><sup>*</sup>Processing fee and other loan charges are not included.</p>
            <p className="text-gray-600">
              Disclaimer: Applicable rate of interest can vary subject to credit profile. Loan approval is at the sole discretion of the finance partner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
