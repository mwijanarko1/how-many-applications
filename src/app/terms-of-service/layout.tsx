import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Job Application Tracker',
  description: 'Terms of Service for Job Application Tracker - read our terms and conditions.',
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
