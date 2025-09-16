export interface JobApplication {
  id: string;
  title: string;
  company: string;
  description: string;
  jobLink: string;
  appliedDate: string;
  assessment: boolean | null; // null = no assessment yet, true = yes, false = no
  response: boolean | null; // null = no response yet, true = yes, false = no
  responseDate: string | null;
  interview: boolean | null; // null = no interview yet, true = yes, false = no
  decision: string;
}

export interface JobApplicationFormData {
  title: string;
  company: string;
  description: string;
  jobLink: string;
  appliedDate: string;
}
