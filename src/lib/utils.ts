import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks if a job application should be marked as 'no_response'
 * @param appliedDate The date the application was submitted (YYYY-MM-DD format)
 * @param response The current response status
 * @returns true if the job should be marked as no response
 */
export function shouldMarkAsNoResponse(appliedDate: string, response: string | null): boolean {
  if (response !== null) return false; // Already has a response

  const appliedDateObj = new Date(appliedDate);
  const now = new Date();
  const oneMonthInMs = 30 * 24 * 60 * 60 * 1000; // Approximate 30 days

  return (now.getTime() - appliedDateObj.getTime()) > oneMonthInMs;
}
