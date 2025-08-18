'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, AlertTriangle, Info, Shield, FileText } from 'lucide-react'
import Link from 'next/link'

export default function Disclaimer() {
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
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Disclaimer</h1>
                <p className="text-sm text-gray-600">Important information</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Disclaimer</h2>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="space-y-8">
              {/* Main Disclaimer */}
              <section>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Important Disclaimer
                  </h3>
                  <p className="text-red-700 leading-relaxed">
                    <strong>This website is not a financial institution.</strong> Loan Calculator is an educational tool designed to help users 
                    understand loan calculations and financial planning. We do not provide financial advice, lending services, or banking products.
                  </p>
                </div>
              </section>

              {/* Educational Purpose */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Educational Purpose Only
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our loan calculators are provided for educational and informational purposes only. They are designed to help you understand:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                  <li>How EMI calculations work</li>
                  <li>The impact of interest rates on loan payments</li>
                  <li>Total interest burden over loan tenure</li>
                  <li>Amortization schedules and payment breakdowns</li>
                </ul>
              </section>

              {/* No Financial Advice */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Not Financial Advice</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-yellow-800">
                    <strong>Important:</strong> The information provided by our calculators should not be considered as financial advice. 
                    We are not licensed financial advisors, and our tools are not substitutes for professional financial consultation.
                  </p>
                </div>
              </section>

              {/* Accuracy Disclaimer */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Accuracy of Calculations</h3>
                <p className="text-gray-700 mb-4">
                  While we strive to provide accurate calculations using standard banking formulas, please note:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Results are estimates and may differ from actual bank calculations</li>
                  <li>Different banks may use slightly different calculation methods</li>
                  <li>Processing fees, prepayment charges, and other costs are not always included</li>
                  <li>Interest rates and terms may change without notice</li>
                  <li>Always verify calculations with your chosen financial institution</li>
                </ul>
              </section>

              {/* Verification Required */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Always Verify with Your Bank
                </h3>
                <p className="text-gray-700">
                  Before making any financial decisions or applying for a loan, we strongly recommend:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                  <li>Consulting with your bank or financial advisor</li>
                  <li>Getting official loan quotes from multiple lenders</li>
                  <li>Reading all loan documents carefully</li>
                  <li>Understanding all terms, conditions, and fees</li>
                  <li>Comparing different loan options available to you</li>
                </ul>
              </section>

              {/* Risk Acknowledgment */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Risk Acknowledgment</h3>
                <p className="text-gray-700">
                  By using our loan calculator, you acknowledge that:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                  <li>You understand the limitations of our calculations</li>
                  <li>You will not rely solely on our results for financial decisions</li>
                  <li>You accept responsibility for your financial choices</li>
                  <li>You will seek professional advice when necessary</li>
                </ul>
              </section>

              {/* External Links */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">External Links and References</h3>
                <p className="text-gray-700">
                  Our website may contain links to external websites, financial institutions, or third-party services. 
                  We do not endorse, guarantee, or take responsibility for the content, accuracy, or availability of these external sites.
                </p>
              </section>

              {/* Market Conditions */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Conditions</h3>
                <p className="text-gray-700">
                  Financial markets and lending conditions change frequently. Interest rates, loan terms, and lending policies 
                  may vary significantly over time and between different financial institutions. Our calculators may not reflect 
                  current market conditions or specific lender policies.
                </p>
              </section>

              {/* Regulatory Compliance */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Regulatory Compliance</h3>
                <p className="text-gray-700">
                  Different countries and regions have varying financial regulations and consumer protection laws. 
                  Our calculators are general tools and may not account for specific regulatory requirements in your jurisdiction.
                </p>
              </section>

              {/* Updates and Changes */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Updates and Changes</h3>
                <p className="text-gray-700">
                  We may update our calculators, formulas, or this disclaimer from time to time. 
                  It is your responsibility to review any changes and understand how they may affect your use of our service.
                </p>
              </section>

              {/* Contact for Questions */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions and Concerns</h3>
                <p className="text-gray-700 mb-4">
                  If you have questions about this disclaimer or our calculators, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700">
                    <strong>Email:</strong> balmeetsingh44@gmail.com<br />
                    <strong>Website:</strong> www.loancalculator.in
                  </p>
                </div>
              </section>

              {/* Related Documents */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Related Documents
                </h3>
                <p className="text-gray-700 mb-4">
                  Please also review our other important documents:
                </p>
                <div className="space-y-2">
                  <Link href="/privacy-policy" className="block text-blue-600 hover:text-blue-800 transition-colors">
                    • Privacy Policy
                  </Link>
                  <Link href="/terms" className="block text-blue-600 hover:text-blue-800 transition-colors">
                    • Terms and Conditions
                  </Link>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
