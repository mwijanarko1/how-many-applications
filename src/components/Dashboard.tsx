"use client";

import { useState, useEffect } from "react";
import { JobApplication, JobApplicationFormData } from "@/types/jobApplication";
import JobForm from "./JobForm";
import JobTable from "./JobTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

export default function Dashboard() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

  // Load jobs from localStorage on component mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobApplications');
    if (savedJobs) {
      try {
        const parsedJobs = JSON.parse(savedJobs);

        // Migrate old data to include new fields
        const migratedJobs = parsedJobs.map((job: Partial<JobApplication>) => ({
          ...job,
          interview: job.interview !== undefined ? job.interview : null, // Add interview field if missing
          assessment: job.assessment !== undefined ? job.assessment : null, // Add assessment field if missing
        })) as JobApplication[];

        setJobs(migratedJobs);
      } catch (error) {
        console.error('Error loading jobs from localStorage:', error);
        // If there's an error, clear the corrupted data
        localStorage.removeItem('jobApplications');
        setJobs([]);
      }
    }
  }, []);

  // Save jobs to localStorage whenever jobs state changes
  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = (jobData: JobApplicationFormData) => {
    if (editingJob) {
      // Update existing job
      setJobs(prev => prev.map(job =>
        job.id === editingJob.id
          ? { ...job, ...jobData }
          : job
      ));
      setEditingJob(null);
    } else {
      // Add new job
      const newJob: JobApplication = {
        ...jobData,
        id: Date.now().toString(), // Simple ID generation
        assessment: null,
        response: null,
        responseDate: null,
        interview: null,
        decision: "",
      };
      setJobs(prev => [newJob, ...prev]);
    }
  };

  const handleDeleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const handleUpdateJob = (id: string, updates: Partial<JobApplication>) => {
    setJobs(prev => prev.map(job =>
      job.id === id ? { ...job, ...updates } : job
    ));
  };

  const handleEditJob = (job: JobApplication) => {
    setEditingJob(job);
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
  };

  // Calculate summary statistics
  const totalApplications = jobs.length;
  const totalRejected = jobs.filter(job => job.decision === 'Rejected').length;
  const totalInterview1 = jobs.filter(job => job.assessment === true).length;
  const totalInterviewFinal = jobs.filter(job => job.decision === 'Offered Job').length;
  const totalResponses = jobs.filter(job => job.response === true).length;
  const totalInterviews = jobs.filter(job => job.interview === true).length;
  const responseRate = totalApplications > 0 ?
    (totalResponses / totalApplications * 100).toFixed(1) : 0;
  const interviewRate = totalApplications > 0 ?
    (totalInterviews / totalApplications * 100).toFixed(1) : 0;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      description: "Jobs you've applied to",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      description: `${totalResponses} responses received`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Interview Rate",
      value: `${interviewRate}%`,
      description: `${totalInterviews} interviews scheduled`,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Job Offers",
      value: totalInterviewFinal,
      description: "Positions offered",
      icon: Award,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary rounded-lg">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Job Application Tracker</h1>
              <p className="text-slate-600">Track your job applications and interview progress</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="secondary" className="text-sm">
              <Clock className="w-3 h-3 mr-1" />
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {totalApplications} applications tracked
            </Badge>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-md ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <CardDescription className="text-xs">
                    {stat.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Success Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Assessments Passed</span>
                <Badge variant="secondary">{totalInterview1}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Interviews Completed</span>
                <Badge variant="secondary">{totalInterviews}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Job Offers Received</span>
                <Badge variant="secondary">{totalInterviewFinal}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Awaiting Response</span>
                <Badge variant="outline">
                  {jobs.filter(job => job.response === null).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Pending Assessments</span>
                <Badge variant="outline">
                  {jobs.filter(job => job.assessment === null).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Awaiting Interviews</span>
                <Badge variant="outline">
                  {jobs.filter(job => job.interview === null && job.assessment === true).length}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Applications Rejected</span>
                <Badge variant="destructive">{totalRejected}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">No Response Yet</span>
                <Badge variant="secondary">
                  {jobs.filter(job => job.response === false).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Active Applications</span>
                <Badge variant="default">
                  {jobs.filter(job => job.decision === "").length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form and Table */}
        <div className="space-y-8">
          <JobForm
            onSubmit={handleAddJob}
            editingJob={editingJob}
            onCancelEdit={handleCancelEdit}
          />
          <JobTable
            jobs={jobs}
            onDelete={handleDeleteJob}
            onUpdate={handleUpdateJob}
            onEdit={handleEditJob}
          />
        </div>
      </div>
    </div>
  );
}
