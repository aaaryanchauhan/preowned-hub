
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { CreditCard, ChevronsUpDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface EmiCalculatorProps {
  carPrice: number;
}

const EmiCalculator: React.FC<EmiCalculatorProps> = ({ carPrice }) => {
  const minLoanAmount = 100000;
  const maxLoanAmount = Math.max(carPrice, minLoanAmount);
  const minDownPayment = 0;
  const maxDownPayment = Math.floor(carPrice * 0.8);
  const minMonths = 12;
  const maxMonths = 84;
  const interestRate = 7.5; // Annual interest rate in percentage

  const [loanAmount, setLoanAmount] = useState<number>(Math.floor(carPrice * 0.75));
  const [downPayment, setDownPayment] = useState<number>(Math.floor(carPrice * 0.25));
  const [months, setMonths] = useState<number>(60);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Calculate EMI
  const calculateEmi = () => {
    // Monthly interest rate
    const monthlyRate = interestRate / 12 / 100;
    
    // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emiValue = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    
    setEmi(Math.round(emiValue));
    
    // Calculate total interest and total amount
    const totalPaid = emiValue * months;
    setTotalInterest(Math.round(totalPaid - loanAmount));
    setTotalAmount(Math.round(totalPaid));
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
            <span className="text-lg align-top">₹</span>
            {formatCurrency(emi).replace('$', '')}
            <span className="text-sm font-normal text-gray-500"> per month</span>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-[#E0F7F0] mr-2"></div>
                <span className="text-gray-600">Principal Loan Amount</span>
              </div>
              <span className="font-medium">₹{formatCurrency(loanAmount).replace('$', '')}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-[#4EB69C] mr-2"></div>
                <span className="text-gray-600">Total Interest Payable</span>
              </div>
              <span className="font-medium">₹{formatCurrency(totalInterest).replace('$', '')}</span>
            </div>
            
            <div className="flex justify-between text-sm border-t border-gray-100 pt-4 font-semibold">
              <div className="flex items-center">
                <span className="text-gray-800">Total Amount Payable</span>
              </div>
              <span>₹{formatCurrency(totalAmount).replace('$', '')}</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-[#1A1F2C] font-medium">Loan Amount</label>
              <span className="text-[#8B5CF6] font-semibold">₹{formatCurrency(loanAmount).replace('$', '')}</span>
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
              <span>₹{formatCurrency(minLoanAmount).replace('$', '')}</span>
              <span>₹{formatCurrency(maxLoanAmount).replace('$', '')}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-[#1A1F2C] font-medium">Down Payment<sup>*</sup></label>
              <span className="text-[#8B5CF6] font-semibold">₹{formatCurrency(downPayment).replace('$', '')}</span>
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
              <span>₹{formatCurrency(minDownPayment).replace('$', '')}</span>
              <span>₹{formatCurrency(maxDownPayment).replace('$', '')}</span>
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

          <Button className="w-full bg-[#8B5CF6] hover:bg-[#7E69AB]">
            CHECK ELIGIBILITY
          </Button>

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
