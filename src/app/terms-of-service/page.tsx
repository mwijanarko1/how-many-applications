"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsOfServicePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              <strong>Effective Date:</strong> September 16, 2025
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Job Application Tracker (&quot;Service&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our web application and services. By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">Job Application Tracker is a web application that allows you to track and organize your job applications. Our Service includes:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Secure storage of job application data</li>
              <li>Organization and filtering tools</li>
              <li>Progress tracking features</li>
              <li>Data export capabilities</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Eligibility</h2>
            <p className="text-gray-700 mb-4">
              You must be at least 13 years old to use our Service. By using our Service, you represent and warrant that you meet this age requirement.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Account Registration and Security</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">4.1 Account Creation</h3>
            <p className="text-gray-700 mb-4">
              You must create an account using Google authentication to use our Service. You are responsible for maintaining the confidentiality of your Google account credentials.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">4.2 Account Security</h3>
            <p className="text-gray-700 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Keep your Google account secure</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Take responsibility for all activities under your account</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. User Obligations</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">5.1 Accurate Information</h3>
            <p className="text-gray-700 mb-4">
              You agree to provide accurate and complete information when using our Service. You are responsible for keeping your job application data up to date.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">5.2 Lawful Use</h3>
            <p className="text-gray-700 mb-4">
              You agree to use our Service only for lawful purposes and in compliance with all applicable laws and regulations.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">5.3 Data Ownership</h3>
            <p className="text-gray-700 mb-4">
              You retain ownership of all job application data you enter into our Service. You grant us a limited license to store and process this data solely for providing our Service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated tools to access the Service without permission</li>
              <li>Share your account credentials with others</li>
              <li>Upload malicious code or viruses</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Intellectual Property</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">7.1 Our Intellectual Property</h3>
            <p className="text-gray-700 mb-4">
              All content, features, and functionality of our Service, including but not limited to text, graphics, logos, and software, are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">7.2 Your Content</h3>
            <p className="text-gray-700 mb-4">
              You retain ownership of the job application data you create and upload. By using our Service, you grant us a limited, non-exclusive license to store, display, and process your data solely for providing the Service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Service Availability and Modifications</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">9.1 Availability</h3>
            <p className="text-gray-700 mb-4">
              We strive to provide continuous access to our Service but do not guarantee uninterrupted availability. We may perform maintenance or updates that temporarily make the Service unavailable.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">9.2 Modifications</h3>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify, suspend, or discontinue any part of our Service at any time without notice. We may also update these Terms from time to time.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Termination</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">10.1 Termination by You</h3>
            <p className="text-gray-700 mb-4">
              You may terminate your account at any time by deleting it through the Service.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">10.2 Termination by Us</h3>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account immediately, without prior notice, for any violation of these Terms or for other conduct that we determine, in our sole discretion, to be harmful to our Service or other users.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">10.3 Effect of Termination</h3>
            <p className="text-gray-700 mb-4">
              Upon termination, your right to use the Service will cease immediately. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Disclaimer of Warranties</h2>
            <p className="text-gray-700 mb-4">
              OUR SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>IMPLIED WARRANTIES OF MERCHANTABILITY</li>
              <li>FITNESS FOR A PARTICULAR PURPOSE</li>
              <li>NON-INFRINGEMENT</li>
              <li>ACCURACY OR RELIABILITY OF DATA</li>
            </ul>
            <p className="text-gray-700 mb-4">WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
            </p>
            <p className="text-gray-700 mb-4">
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE PAST 12 MONTHS, IF ANY.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">13. Indemnification</h2>
            <p className="text-gray-700 mb-4">
              You agree to indemnify and hold us harmless from any claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the Service, your violation of these Terms, or your violation of any rights of another party.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">14. Governing Law and Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization].
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">15. Severability</h2>
            <p className="text-gray-700 mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">16. Entire Agreement</h2>
            <p className="text-gray-700 mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding the use of our Service and supersede all prior agreements.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">17. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">We may update these Terms from time to time. We will notify you of any material changes by:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Posting the updated Terms on our website</li>
              <li>Sending you an email notification</li>
              <li>Displaying a notice in the application</li>
            </ul>
            <p className="text-gray-700 mb-4">Your continued use of the Service after changes take effect constitutes acceptance of the updated Terms.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">18. Contact Information</h2>
            <p className="text-gray-700 mb-4">If you have any questions about these Terms, please contact us at:</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700"><strong>Email:</strong> legal@jobtracker.app</p>
              <p className="text-gray-700"><strong>Subject:</strong> Terms of Service Inquiry</p>
            </div>

            <hr className="my-8 border-gray-300" />
            <p className="text-sm text-gray-600 italic">
              *Last updated: September 16, 2025*
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
