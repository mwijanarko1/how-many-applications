"use client";

import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import Login from './Login';
import { Loader2 } from 'lucide-react';

interface ConditionalAuthGuardProps {
  children: React.ReactNode;
}

export default function ConditionalAuthGuard({ children }: ConditionalAuthGuardProps) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Pages that don't require authentication
  const publicPages = ['/', '/privacy-policy', '/terms-of-service'];

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If it's a public page, allow access without authentication
  if (publicPages.includes(pathname)) {
    return <>{children}</>;
  }

  // For all other pages, require authentication
  if (!user) {
    return <Login />;
  }

  // User is authenticated, show the protected content
  return <>{children}</>;
}
