import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Job Application Tracker',
  description: 'Privacy policy for Job Application Tracker - learn how we protect your data.',
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
