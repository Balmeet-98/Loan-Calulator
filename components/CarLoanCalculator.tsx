'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Car, DollarSign, TrendingUp, Calendar, Percent } from 'lucide-react'
import { 
  calculateCarLoan, 
  formatCurrency, 
  formatPercentage,
  validateLoanInputs,
  type LoanInputs 
} from '@/utils/loanCalculations'

export default function CarLoanCalculator() {
  const [inputs, setInputs] = useState<LoanInputs>({
    principal: 800000,
    interestRate: 12.5,
    tenure: 5,
    downPayment: 200000
  })

  const [carValue, setCarValue] = useState(1000000)
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
      const result = calculateCarLoan(inputs)
      setResults(result)
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

  const downPaymentPercentage = (inputs.downPayment / carValue) * 100
  const loanAmount = carValue - inputs.downPayment

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Car className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">Car Loan Calculator</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your car loan EMI with down payment options. 
          Plan your car purchase with accurate EMI calculations and interest breakdown.
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Car & Loan Details</h3>
            
            {/* Car Value */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Car Value (₹)
              </label>
              <input
                type="number"
                value={carValue}
                onChange={(e) => setCarValue(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter car value"
              />
              <input
                type="range"
                min="200000"
                max="10000000"
                step="10000"
                value={carValue}
                onChange={(e) => setCarValue(parseFloat(e.target.value) || 0)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹2,00,000</span>
                <span>₹1,00,00,000</span>
              </div>
            </div>

            {/* Down Payment */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Down Payment (₹)
              </label>
              <input
                type="number"
                value={inputs.downPayment || 0}
                onChange={(e) => handleInputChange('downPayment', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter down payment"
                max={carValue}
              />
              <input
                type="range"
                min="0"
                max={carValue}
                step="10000"
                value={inputs.downPayment || 0}
                onChange={(e) => handleSliderChange('downPayment', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹0</span>
                <span>{formatCurrency(carValue)}</span>
              </div>
            </div>

            {/* Loan Amount Summary */}
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-purple-900 mb-2">Loan Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-700">Down Payment Amount:</span>
                  <span className="font-semibold text-purple-900">{formatCurrency(inputs.downPayment || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Down Payment %:</span>
                  <span className="font-semibold text-purple-900">{downPaymentPercentage.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Loan Amount:</span>
                  <span className="font-semibold text-purple-900">{formatCurrency(loanAmount)}</span>
                </div>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter interest rate"
                step="0.1"
              />
              <input
                type="range"
                min="8"
                max="20"
                step="0.1"
                value={inputs.interestRate}
                onChange={(e) => handleSliderChange('interestRate', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>8%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Loan Tenure (Years)
              </label>
              <input
                type="number"
                value={inputs.tenure}
                onChange={(e) => handleInputChange('tenure', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter tenure"
              />
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={inputs.tenure}
                onChange={(e) => handleSliderChange('tenure', e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 Year</span>
                <span>8 Years</span>
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
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6"
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
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6"
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
              className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Car Loan Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Car Value:</span>
                <span className="font-semibold">{formatCurrency(carValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Down Payment:</span>
                <span className="font-semibold text-purple-600">{formatCurrency(inputs.downPayment || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-semibold">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate:</span>
                <span className="font-semibold">{formatPercentage(inputs.interestRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Tenure:</span>
                <span className="font-semibold">{inputs.tenure} Years</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly EMI:</span>
                  <span className="font-semibold text-purple-600">{formatCurrency(results.emi)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold text-blue-600">{formatCurrency(results.totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(results.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Schedule Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
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
