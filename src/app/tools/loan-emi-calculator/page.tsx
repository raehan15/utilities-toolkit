"use client";

import { useState } from "react";

interface LoanResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principalAmount: number;
}

export default function LoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [tenureType, setTenureType] = useState<"months" | "years">("years");
  const [result, setResult] = useState<LoanResult | null>(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const tenure = parseFloat(loanTenure);

    if (
      !principal ||
      !rate ||
      !tenure ||
      principal <= 0 ||
      rate <= 0 ||
      tenure <= 0
    ) {
      alert("Please enter valid positive values for all fields");
      return;
    }

    // Convert annual interest rate to monthly and percentage to decimal
    const monthlyRate = rate / (12 * 100);

    // Convert tenure to months
    const tenureInMonths = tenureType === "years" ? tenure * 12 : tenure;

    // EMI calculation using the formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emiNumerator =
      principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths);
    const emiDenominator = Math.pow(1 + monthlyRate, tenureInMonths) - 1;
    const emi = emiNumerator / emiDenominator;

    const totalAmount = emi * tenureInMonths;
    const totalInterest = totalAmount - principal;

    setResult({
      emi: Math.round(emi * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      principalAmount: principal,
    });
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setResult(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInterestPercentage = () => {
    if (!result) return 0;
    return Math.round((result.totalInterest / result.totalAmount) * 100);
  };

  const getPrincipalPercentage = () => {
    if (!result) return 0;
    return Math.round((result.principalAmount / result.totalAmount) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Loan / EMI Calculator
          </h1>
          <p className="text-slate-600 text-lg">
            Calculate your monthly EMI, total interest, and repayment details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="loanAmount"
                className="block text-sm font-bold text-slate-700 mb-3"
              >
                Loan Amount (₹)
              </label>
              <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount (e.g., 500000)"
                className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-slate-900 placeholder-slate-500 bg-white text-lg"
              />
            </div>

            <div>
              <label
                htmlFor="interestRate"
                className="block text-sm font-bold text-slate-700 mb-3"
              >
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate (e.g., 8.5)"
                className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-slate-900 placeholder-slate-500 bg-white text-lg"
              />
            </div>

            <div>
              <label
                htmlFor="loanTenure"
                className="block text-sm font-bold text-slate-700 mb-3"
              >
                Loan Tenure
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  id="loanTenure"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  placeholder="Enter tenure"
                  className="flex-1 px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-slate-900 placeholder-slate-500 bg-white text-lg"
                />
                <select
                  value={tenureType}
                  onChange={(e) =>
                    setTenureType(e.target.value as "months" | "years")
                  }
                  className="px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-slate-900 bg-white text-lg"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={calculateEMI}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl"
              >
                Calculate EMI
              </button>
              <button
                onClick={reset}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium text-lg"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {result && (
              <>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                    Loan Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="font-medium text-slate-700">
                        Monthly EMI
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(result.emi)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="font-medium text-slate-700">
                        Principal Amount
                      </span>
                      <span className="text-lg font-semibold text-slate-800">
                        {formatCurrency(result.principalAmount)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="font-medium text-slate-700">
                        Total Interest
                      </span>
                      <span className="text-lg font-semibold text-orange-600">
                        {formatCurrency(result.totalInterest)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-slate-700">
                        Total Amount
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        {formatCurrency(result.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pie Chart Representation */}
                <div className="bg-white rounded-xl p-6 border-2 border-slate-100 shadow-md">
                  <h4 className="text-lg font-bold text-slate-800 mb-4 text-center">
                    Payment Breakdown
                  </h4>

                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <div
                        className="absolute inset-0 rounded-full border-8 border-green-500"
                        style={{
                          background: `conic-gradient(#10b981 0% ${getPrincipalPercentage()}%, #f59e0b ${getPrincipalPercentage()}% 100%)`,
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs font-medium text-slate-600">
                            Total
                          </div>
                          <div className="text-sm font-bold text-slate-800">
                            {formatCurrency(result.totalAmount)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                        <span className="text-sm font-medium text-slate-700">
                          Principal
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-800">
                        {getPrincipalPercentage()}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                        <span className="text-sm font-medium text-slate-700">
                          Interest
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-800">
                        {getInterestPercentage()}%
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!result && (
              <div className="bg-slate-50 rounded-xl p-8 text-center border-2 border-dashed border-slate-300">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-lg font-medium text-slate-600 mb-2">
                  Enter loan details
                </h3>
                <p className="text-slate-500">
                  Fill in the form to calculate your EMI and see the breakdown
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-100">
          <h3 className="text-lg font-bold text-slate-800 mb-3">
            💰 Loan Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              • Compare interest rates from multiple lenders before choosing
            </li>
            <li>
              • Consider making a higher down payment to reduce EMI burden
            </li>
            <li>• Shorter tenure means higher EMI but lower total interest</li>
            <li>• EMI should not exceed 40% of your monthly income</li>
            <li>• Consider prepayment options to save on interest</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
