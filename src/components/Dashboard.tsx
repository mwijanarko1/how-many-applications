"use client";

import { useState, useEffect } from "react";
import { JobApplication, JobApplicationFormData } from "@/types/jobApplication";
import { useAuth } from "@/contexts/AuthContext";
import JobForm from "./JobForm";
import JobTable from "./JobTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  Clock,
  XCircle,
  LogOut,
  User
} from "lucide-react";
import {
  getUserJobApplications,
  addJobApplication,
  updateJobApplication,
  deleteJobApplication,
  migrateLocalStorageToFirestore
} from "@/lib/firestore";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);

  // Load jobs from Firestore on component mount and when user changes
  useEffect(() => {
    const loadJobs = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // First, try to migrate any existing localStorage data
        const localJobs = localStorage.getItem('jobApplications');
        if (localJobs) {
          try {
            await migrateLocalStorageToFirestore(user.uid);
          } catch (error) {
            console.error('Error migrating localStorage data:', error);
          }
        }

        // Load jobs from Firestore
        const userJobs = await getUserJobApplications(user.uid);
        setJobs(userJobs);
      } catch (error) {
        console.error('Error loading jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [user]);

  const handleAddJob = async (jobData: JobApplicationFormData) => {
    if (!user) return;

    try {
      if (editingJob) {
        // Update existing job
        await updateJobApplication(editingJob.id, jobData);
        setJobs(prev => prev.map(job =>
          job.id === editingJob.id
            ? { ...job, ...jobData }
            : job
        ));
        setEditingJob(null);
      } else {
        // Add new job
        const newJobId = await addJobApplication(user.uid, jobData);
        const newJob: JobApplication = {
          ...jobData,
          id: newJobId,
          assessment: null,
          response: null,
          responseDate: null,
          interview: null,
          decision: "",
        };
        setJobs(prev => [newJob, ...prev]);
      }
    } catch (error) {
      console.error('Error adding/updating job:', error);
      // You might want to show a toast notification here
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJobApplication(id);
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      // You might want to show a toast notification here
    }
  };

  const handleUpdateJob = async (id: string, updates: Partial<JobApplication>) => {
    try {
      await updateJobApplication(id, updates);
      setJobs(prev => prev.map(job =>
        job.id === id ? { ...job, ...updates } : job
      ));
    } catch (error) {
      console.error('Error updating job:', error);
      // You might want to show a toast notification here
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
  const totalResponses = jobs.filter(job => job.response !== null).length;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your job applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">How many applications?!</h1>
                <p className="text-slate-600">Track your job applications and interview progress</p>
              </div>
            </div>

            {/* User Info and Sign Out */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <User className="h-4 w-4" />
                <span>{user?.displayName || user?.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <Clock className="w-3 h-3 mr-1" />
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {totalApplications} applications tracked
            </Badge>
          </div>
        </div>

        {/* Add New Job Application Button */}
        <div className="mb-8">
          <JobForm
            onSubmit={handleAddJob}
            editingJob={editingJob}
            onCancelEdit={handleCancelEdit}
          />
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
                  {jobs.filter(job => job.response === 'assessment' && job.assessment === null).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">No Assessment Required</span>
                <Badge variant="outline">
                  {jobs.filter(job => job.assessment === 'n/a').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Awaiting Interviews</span>
                <Badge variant="outline">
                  {jobs.filter(job => job.interview === null && (job.assessment === true || job.response === 'interview')).length}
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
                <span className="text-sm text-slate-600">Active Applications</span>
                <Badge variant="default">
                  {jobs.filter(job => job.decision === "").length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Applications Rejected</span>
                <Badge variant="destructive">{totalRejected}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Applications Table */}
        <div>
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
