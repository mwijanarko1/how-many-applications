export interface JobApplication {
  id: string;
  title: string;
  company: string;
  description: string;
  jobLink: string;
  appliedDate: string;
  assessment: boolean | null | 'n/a'; // null = pending, true = passed, false = not passed, 'n/a' = no assessment required
  response: 'assessment' | 'interview' | 'rejection' | 'no_response' | null; // null = waiting, 'assessment' = got assessment, 'interview' = got interview, 'rejection' = rejected, 'no_response' = no response after 1 month
  responseDate: string | null;
  interview: boolean | null; // null = no interview yet, true = scheduled, false = no interview
  decision: string;
}

export interface JobApplicationFormData {
  title: string;
  company: string;
  description: string;
  jobLink: string;
  appliedDate: string;
}
