"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              <strong>Effective Date:</strong> September 16, 2025
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Job Application Tracker (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">2.1 Information from Google Authentication</h3>
            <p className="text-gray-700 mb-4">When you sign in with Google, we collect:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Your Google account email address</li>
              <li>Your display name</li>
              <li>Your Google profile picture (optional)</li>
              <li>Google user ID</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">2.2 Job Application Data</h3>
            <p className="text-gray-700 mb-4">When you use our application, we collect:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Company names</li>
              <li>Job titles</li>
              <li>Application dates</li>
              <li>Job descriptions</li>
              <li>Application status</li>
              <li>Interview dates and notes</li>
              <li>Salary information</li>
              <li>Contact information for recruiters/companies</li>
              <li>Personal notes and reflections</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">2.3 Technical Information</h3>
            <p className="text-gray-700 mb-4">We automatically collect:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Device information (browser type, operating system)</li>
              <li>IP address</li>
              <li>Usage patterns and analytics</li>
              <li>Error logs and performance data</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide and maintain our job application tracking service</li>
              <li>Authenticate your identity and secure your account</li>
              <li>Store and organize your job application data</li>
              <li>Improve our application and develop new features</li>
              <li>Provide customer support</li>
              <li>Ensure security and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Storage and Security</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">4.1 Data Storage</h3>
            <p className="text-gray-700 mb-4">Your data is stored securely using Google Firebase/Firestore, which provides:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>End-to-end encryption in transit and at rest</li>
              <li>Secure authentication and authorization</li>
              <li>Regular security updates and monitoring</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">4.2 Data Security Measures</h3>
            <p className="text-gray-700 mb-4">We implement industry-standard security measures including:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Secure authentication protocols</li>
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Access controls and permissions</li>
              <li>Regular security audits</li>
              <li>Data backup and recovery procedures</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">5.1 With Your Consent</h3>
            <p className="text-gray-700 mb-4">When you explicitly agree to share your data</p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">5.2 Service Providers</h3>
            <p className="text-gray-700 mb-4">With trusted third-party service providers who help us operate our service (Google Firebase), bound by strict confidentiality agreements</p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">5.3 Legal Requirements</h3>
            <p className="text-gray-700 mb-4">When required by law, court order, or government regulation</p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">5.4 Business Transfers</h3>
            <p className="text-gray-700 mb-4">In connection with a merger, acquisition, or sale of our assets</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Your Rights and Choices</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">6.1 Access and Control</h3>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Access all your stored data</li>
              <li>Download your data in a portable format</li>
              <li>Delete your account and all associated data</li>
              <li>Update your information</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">6.2 Data Deletion</h3>
            <p className="text-gray-700 mb-4">You can delete your account and all associated data at any time. This action is irreversible and will permanently remove all your job application records.</p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">6.3 Opt-out</h3>
            <p className="text-gray-700 mb-4">You can stop using our service at any time by deleting your account.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Data Retention</h2>
            <p className="text-gray-700 mb-4">We retain your data for as long as your account is active. When you delete your account, all your data is permanently deleted from our systems within 30 days, except where retention is required by law.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">We use essential cookies and analytics to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Keep you signed in</li>
              <li>Remember your preferences</li>
              <li>Improve application performance</li>
              <li>Monitor usage patterns</li>
            </ul>
            <p className="text-gray-700 mb-4">We do not use advertising cookies or track you across other websites.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">Your data is stored on Google Firebase servers, which may involve transfers to countries outside your own. Google maintains appropriate safeguards to protect your data in accordance with applicable privacy laws.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-gray-700 mb-4">Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">We may update this Privacy Policy from time to time. We will notify you of any material changes by:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Posting the updated policy on our website</li>
              <li>Sending you an email notification</li>
              <li>Displaying a notice in the application</li>
            </ul>
            <p className="text-gray-700 mb-4">Your continued use of the service after changes take effect constitutes acceptance of the updated policy.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 mb-4">If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700"><strong>Email:</strong> privacy@jobtracker.app</p>
              <p className="text-gray-700"><strong>Subject:</strong> Privacy Policy Inquiry</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 mb-4">This Privacy Policy is governed by and construed in accordance with applicable data protection laws and regulations.</p>

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
