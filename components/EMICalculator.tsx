'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import { 
  calculateEMI, 
  calculateTotalInterest, 
  generateAmortizationSchedule, 
  formatCurrency, 
  formatPercentage,
  validateLoanInputs,
  type LoanInputs 
} from '@/utils/loanCalculations'

export default function EMICalculator() {
  const [inputs, setInputs] = useState<LoanInputs>({
    principal: 1000000,
    interestRate: 8.5,
    tenure: 20,
    prepaymentAmount: 0,
    prepaymentMonth: 0
  })

  const [results, setResults] = useState({
    emi: 0,
    totalInterest: 0,
    totalAmount: 0,
    amortizationSchedule: []
  })

  const [showSchedule, setShowSchedule] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    const validation = validateLoanInputs(inputs)
    setErrors(validation.errors)

    if (validation.isValid) {
      const emi = calculateEMI(inputs.principal, inputs.interestRate, inputs.tenure)
      const totalInterest = calculateTotalInterest(emi, inputs.principal, inputs.tenure)
      const totalAmount = emi * inputs.tenure * 12
      const schedule = generateAmortizationSchedule(inputs)

      setResults({
        emi,
        totalInterest,
        totalAmount,
        amortizationSchedule: schedule
      })
    }
  }, [inputs])

  const handleInputChange = (field: keyof LoanInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSliderChange = (field: keyof LoanInputs, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      handleInputChange(field, numValue)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">EMI Calculator</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your monthly EMI (Equated Monthly Installment) for any loan amount. 
          Get detailed breakdown including total interest and amortization schedule.
        </p>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-red-800 font-semibold mb-2">Please fix the following errors:</h4>
          <ul className="text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Loan Details</h3>
            
            {/* Principal Amount */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={inputs.principal}
                onChange={(e) => handleInputChange('principal', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter loan amount"
              />
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={inputs.principal}
                onChange={(e) => handleSliderChange('principal', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹10,000</span>
                <span>₹1,00,00,000</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Interest Rate (% per annum)
              </label>
              <input
                type="number"
                value={inputs.interestRate}
                onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter interest rate"
                step="0.1"
              />
              <input
                type="range"
                min="1"
                max="25"
                step="0.1"
                value={inputs.interestRate}
                onChange={(e) => handleSliderChange('interestRate', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1%</span>
                <span>25%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Loan Tenure (Years)
              </label>
              <input
                type="number"
                value={inputs.tenure}
                onChange={(e) => handleInputChange('tenure', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter tenure"
              />
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={inputs.tenure}
                onChange={(e) => handleSliderChange('tenure', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Prepayment Options */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Prepayment Amount (Optional)
              </label>
              <input
                type="number"
                value={inputs.prepaymentAmount || 0}
                onChange={(e) => handleInputChange('prepaymentAmount', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter prepayment amount"
              />
            </div>

            {inputs.prepaymentAmount > 0 && (
              <div className="space-y-3 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Prepayment Month
                </label>
                <input
                  type="number"
                  value={inputs.prepaymentMonth || 0}
                  onChange={(e) => handleInputChange('prepaymentMonth', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter month number"
                  min="1"
                  max={inputs.tenure * 12}
                />
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign className="w-6 h-6" />
                <h4 className="font-semibold">Monthly EMI</h4>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(results.emi)}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-6 h-6" />
                <h4 className="font-semibold">Total Interest</h4>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(results.totalInterest)}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="w-6 h-6" />
                <h4 className="font-semibold">Total Amount</h4>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(results.totalAmount)}</p>
            </motion.div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Loan Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Principal Amount:</span>
                <span className="font-semibold">{formatCurrency(inputs.principal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate:</span>
                <span className="font-semibold">{formatPercentage(inputs.interestRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Tenure:</span>
                <span className="font-semibold">{inputs.tenure} Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly EMI:</span>
                <span className="font-semibold text-blue-600">{formatCurrency(results.emi)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest:</span>
                <span className="font-semibold text-green-600">{formatCurrency(results.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-purple-600">{formatCurrency(results.totalAmount)}</span>
              </div>
              {inputs.prepaymentAmount > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prepayment Amount:</span>
                    <span className="font-semibold">{formatCurrency(inputs.prepaymentAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prepayment Month:</span>
                    <span className="font-semibold">{inputs.prepaymentMonth}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Amortization Schedule Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Amortization Schedule */}
      {showSchedule && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border border-gray-200 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Amortization Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2">Month</th>
                  <th className="text-right py-3 px-2">EMI</th>
                  <th className="text-right py-3 px-2">Principal</th>
                  <th className="text-right py-3 px-2">Interest</th>
                  <th className="text-right py-3 px-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {results.amortizationSchedule.slice(0, 12).map((row) => (
                  <tr key={row.month} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2">{row.month}</td>
                    <td className="text-right py-2 px-2">{formatCurrency(row.emi)}</td>
                    <td className="text-right py-2 px-2">{formatCurrency(row.principalPaid)}</td>
                    <td className="text-right py-2 px-2">{formatCurrency(row.interestPaid)}</td>
                    <td className="text-right py-2 px-2">{formatCurrency(row.remainingBalance)}</td>
                  </tr>
                ))}
                {results.amortizationSchedule.length > 12 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      ... and {results.amortizationSchedule.length - 12} more months
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}
