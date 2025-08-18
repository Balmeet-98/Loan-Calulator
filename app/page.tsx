'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Home as HomeIcon, Car, CreditCard, TrendingUp, Shield, Zap } from 'lucide-react'
import EMICalculator from '@/components/EMICalculator'
import HomeLoanCalculator from '@/components/HomeLoanCalculator'
import CarLoanCalculator from '@/components/CarLoanCalculator'
import PersonalLoanCalculator from '@/components/PersonalLoanCalculator'

const calculators = [
  {
    id: 'emi',
    name: 'EMI Calculator',
    description: 'Calculate monthly EMI for any loan amount',
    icon: Calculator,
    color: 'bg-blue-500'
  },
  {
    id: 'home',
    name: 'Home Loan Calculator',
    description: 'Calculate home loan EMI with processing fees',
    icon: HomeIcon,
    color: 'bg-green-500'
  },
  {
    id: 'car',
    name: 'Car Loan Calculator',
    description: 'Calculate car loan EMI with down payment',
    icon: Car,
    color: 'bg-purple-500'
  },
  {
    id: 'personal',
    name: 'Personal Loan Calculator',
    description: 'Calculate personal loan EMI and interest',
    icon: CreditCard,
    color: 'bg-orange-500'
  }
]

const features = [
  {
    icon: Shield,
    title: 'Accurate Calculations',
    description: 'Precise EMI calculations using standard banking formulas'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get results instantly with real-time calculations'
  },
  {
    icon: TrendingUp,
    title: 'Amortization Schedule',
    description: 'Detailed month-by-month breakdown of your loan'
  }
]

export default function Home() {
  const [activeCalculator, setActiveCalculator] = useState('emi')

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'emi':
        return <EMICalculator />
      case 'home':
        return <HomeLoanCalculator />
      case 'car':
        return <CarLoanCalculator />
      case 'personal':
        return <PersonalLoanCalculator />
      default:
        return <EMICalculator />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Loan Calculator</h1>
                <p className="text-sm text-gray-600">Professional Finance Calculator</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#calculators" className="text-gray-600 hover:text-blue-600 transition-colors">
                Calculators
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Calculate Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Loan EMI
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get accurate EMI calculations for home loans, car loans, personal loans, and more. 
              Plan your finances better with our professional loan calculator.
            </p>
          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Navigation */}
      <section id="calculators" className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {calculators.map((calculator) => (
              <button
                key={calculator.id}
                onClick={() => setActiveCalculator(calculator.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  activeCalculator === calculator.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <calculator.icon className="w-5 h-5" />
                <span className="font-medium">{calculator.name}</span>
              </button>
            ))}
          </div>

          {/* Active Calculator */}
          <motion.div
            key={activeCalculator}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            {renderCalculator()}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            About Our Loan Calculator
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Our loan calculator uses standard banking formulas to provide accurate EMI calculations. 
            Whether you're planning to buy a home, car, or need a personal loan, our calculator helps 
            you understand your monthly payments and total interest burden.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="text-left">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">How it works</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Enter loan amount, interest rate, and tenure</li>
                <li>• Get instant EMI calculation</li>
                <li>• View detailed amortization schedule</li>
                <li>• Compare different loan scenarios</li>
              </ul>
            </div>
            <div className="text-left">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Features</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Multiple loan types supported</li>
                <li>• Prepayment calculations</li>
                <li>• Down payment options</li>
                <li>• Processing fee inclusion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Loan Calculator</h4>
              <p className="text-gray-400">
                Professional finance calculator for accurate loan EMI calculations.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#calculators" className="hover:text-white transition-colors">Calculators</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Disclaimer</h4>
              <p className="text-gray-400 text-sm">
                This calculator provides estimates only. Actual loan terms may vary. 
                Please consult with your bank or financial advisor for accurate information.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Loan Calculator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
