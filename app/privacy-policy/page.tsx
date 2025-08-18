'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Cookie, Database } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
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
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="text-sm text-gray-600">Your privacy matters to us</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" />
                  Introduction
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to Loan Calculator. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, and safeguard your information when you use our loan calculator service.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-blue-600" />
                  Information We Collect
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Calculator Inputs</h4>
                    <p className="text-gray-700">
                      <strong>Important:</strong> We do not store any personal loan data you enter in our calculators. 
                      All calculations are performed locally in your browser and are not transmitted to our servers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Automatically Collected Information</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Device information (browser type, operating system)</li>
                      <li>Usage analytics (pages visited, time spent)</li>
                      <li>IP address (for security and analytics purposes)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Cookie className="w-5 h-5 mr-2 text-blue-600" />
                  Cookies and Tracking
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We use cookies and similar technologies to improve your experience:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong>Advertising Cookies:</strong> If you see ads, these help provide relevant content</li>
                  </ul>
                  <p className="text-gray-700">
                    You can control cookie settings through your browser preferences.
                  </p>
                </div>
              </section>

              {/* How We Use Information */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>To provide and maintain our loan calculator service</li>
                  <li>To improve our website functionality and user experience</li>
                  <li>To analyze usage patterns and optimize performance</li>
                  <li>To detect and prevent fraud or abuse</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              {/* Data Sharing */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Sharing and Disclosure</h3>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share information only in these circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With service providers who assist in website operations (under strict confidentiality agreements)</li>
                </ul>
              </section>

              {/* Data Security */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h3>
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your information against unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h3>
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
              </section>

              {/* Children's Privacy */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Children's Privacy</h3>
                <p className="text-gray-700">
                  Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Policy</h3>
                <p className="text-gray-700">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page 
                  and updating the "Last updated" date.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
                <p className="text-gray-700">
                  If you have any questions about this privacy policy, please contact us at:
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
