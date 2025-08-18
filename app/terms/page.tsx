'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, Scale } from 'lucide-react'
import Link from 'next/link'

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Back to Calculator</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Terms & Conditions</h1>
                <p className="text-sm text-gray-600">Please read carefully</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Terms and Conditions</h2>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="space-y-8">
              {/* Agreement */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Agreement to Terms
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using Loan Calculator ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              {/* Service Description */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Description</h3>
                <p className="text-gray-700 mb-4">
                  Loan Calculator provides online financial calculation tools including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>EMI (Equated Monthly Installment) calculators</li>
                  <li>Home loan calculators</li>
                  <li>Car loan calculators</li>
                  <li>Personal loan calculators</li>
                  <li>Amortization schedules</li>
                </ul>
              </section>

              {/* Important Disclaimers */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  Important Disclaimers
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                  <h4 className="font-semibold text-red-800 mb-3">Financial Information Disclaimer</h4>
                  <ul className="list-disc list-inside text-red-700 space-y-2">
                    <li>Our calculators provide estimates only and are for educational purposes</li>
                    <li>Actual loan terms and calculations may vary from bank to bank</li>
                    <li>We are not a financial institution or lending service</li>
                    <li>Results should not be considered as financial advice</li>
                    <li>Always verify calculations with your bank or financial advisor</li>
                  </ul>
                </div>
              </section>

              {/* No Guarantee */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No Guarantee of Accuracy</h3>
                <p className="text-gray-700">
                  While we strive to provide accurate calculations using standard banking formulas, we cannot guarantee the accuracy of results. 
                  Factors such as processing fees, prepayment charges, and bank-specific policies may affect actual loan terms.
                </p>
              </section>

              {/* User Responsibilities */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">User Responsibilities</h3>
                <p className="text-gray-700 mb-4">By using our service, you agree to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Use the calculator for legitimate financial planning purposes only</li>
                  <li>Not rely solely on our calculations for financial decisions</li>
                  <li>Consult with qualified financial professionals when needed</li>
                  <li>Not use our service for any illegal or unauthorized purpose</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property</h3>
                <p className="text-gray-700">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Loan Calculator 
                  and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Scale className="w-5 h-5 mr-2 text-blue-600" />
                  Limitation of Liability
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-yellow-800">
                    <strong>Important:</strong> In no event shall Loan Calculator, nor its directors, employees, partners, agents, suppliers, 
                    or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
                    limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                  </p>
                </div>
              </section>

              {/* Financial Decisions */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Decisions</h3>
                <p className="text-gray-700">
                  You acknowledge that any financial decisions you make based on our calculator results are made at your own risk. 
                  We are not responsible for any financial losses, missed opportunities, or other consequences resulting from your use of our service.
                </p>
              </section>

              {/* Third-Party Links */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Links</h3>
                <p className="text-gray-700">
                  Our Service may contain links to third-party websites or services that are not owned or controlled by Loan Calculator. 
                  We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Termination</h3>
                <p className="text-gray-700">
                  We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
                  including without limitation if you breach the Terms.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Changes to Terms</h3>
                <p className="text-gray-700">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide 
                  at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Governing Law</h3>
                <p className="text-gray-700">
                  These Terms shall be interpreted and governed by the laws of [Your Country], without regard to its conflict of law provisions.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <p className="text-gray-700">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> balmeetsingh44@gmail.com<br />
                    <strong>Website:</strong> www.loancalculator.in
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
