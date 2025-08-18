'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, DollarSign, TrendingUp, Calendar, Zap } from 'lucide-react'
import { 
  calculateEMI, 
  calculateTotalInterest, 
  generateAmortizationSchedule, 
  formatCurrency, 
  formatPercentage,
  validateLoanInputs,
  type LoanInputs 
} from '@/utils/loanCalculations'

export default function PersonalLoanCalculator() {
  const [inputs, setInputs] = useState<LoanInputs>({
    principal: 500000,
    interestRate: 15.5,
    tenure: 3,
    processingFee: 25000
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
      const totalAmount = emi * inputs.tenure * 12 + (inputs.processingFee || 0)
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

  const processingFeePercentage = ((inputs.processingFee || 0) / inputs.principal) * 100

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <CreditCard className="w-8 h-8 text-orange-600" />
          <h2 className="text-3xl font-bold text-gray-900">Personal Loan Calculator</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your personal loan EMI with processing fees. 
          Get quick approval estimates and plan your personal finance needs.
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Loan Details</h3>
            
            {/* Loan Amount */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={inputs.principal}
                onChange={(e) => handleInputChange('principal', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter loan amount"
              />
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={inputs.principal}
                onChange={(e) => handleSliderChange('principal', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹10,000</span>
                <span>₹50,00,000</span>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter interest rate"
                step="0.1"
              />
              <input
                type="range"
                min="10"
                max="25"
                step="0.1"
                value={inputs.interestRate}
                onChange={(e) => handleSliderChange('interestRate', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>10%</span>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter tenure"
              />
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                value={inputs.tenure}
                onChange={(e) => handleSliderChange('tenure', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 Year</span>
                <span>7 Years</span>
              </div>
            </div>

            {/* Processing Fee */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Processing Fee (₹)
              </label>
              <input
                type="number"
                value={inputs.processingFee || 0}
                onChange={(e) => handleInputChange('processingFee', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter processing fee"
              />
            </div>

            {/* Processing Fee Info */}
            {inputs.processingFee > 0 && (
              <div className="bg-orange-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-orange-900 mb-2">Processing Fee Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-orange-700">Processing Fee:</span>
                    <span className="font-semibold text-orange-900">{formatCurrency(inputs.processingFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-700">Fee Percentage:</span>
                    <span className="font-semibold text-orange-900">{processingFeePercentage.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Features */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Personal Loan Features</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Quick approval within 24-48 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>No collateral required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Flexible repayment options</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Minimal documentation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6"
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
              className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6"
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
              className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-6"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Loan Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
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
                <span className="text-gray-600">Processing Fee:</span>
                <span className="font-semibold">{formatCurrency(inputs.processingFee || 0)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly EMI:</span>
                  <span className="font-semibold text-orange-600">{formatCurrency(results.emi)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold text-red-600">{formatCurrency(results.totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold text-pink-600">{formatCurrency(results.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Schedule Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
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
