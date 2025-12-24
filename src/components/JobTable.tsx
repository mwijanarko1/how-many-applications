"use client";

import { useState } from "react";
import { JobApplication } from "@/types/jobApplication";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BasicDropdown from "@/components/smoothui/basic-dropdown";
import BasicModal from "@/components/smoothui/basic-modal";
import {
  Briefcase,
  ExternalLink,
  MoreHorizontal,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Eye,
  Link as LinkIcon,
  Users
} from "lucide-react";

interface FilterState {
  response: string;
  decision: string;
  assessment: string;
  interview: string;
}

interface JobTableProps {
  jobs: JobApplication[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<JobApplication>) => void;
  onEdit: (job: JobApplication) => void;
  totalJobsCount?: number;
  filters?: FilterState;
  onFilterChange?: (filterType: keyof FilterState, value: string) => void;
  onClearFilters?: () => void;
}

export default function JobTable({
  jobs,
  onDelete,
  onUpdate,
  onEdit,
  totalJobsCount,
  filters,
  onFilterChange,
  onClearFilters
}: JobTableProps) {
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [editingDate, setEditingDate] = useState<{
    jobId: string;
    field: 'appliedDate' | 'responseDate';
    currentDate: string;
  } | null>(null);

  // Helper functions to determine which columns to show
  const shouldShowAssessmentColumn = (jobs: JobApplication[]) => {
    return jobs.some(job => job.response === 'assessment');
  };

  const shouldShowInterviewColumn = (jobs: JobApplication[]) => {
    return jobs.some(job =>
      job.response === 'interview' ||
      job.assessment === true ||
      job.assessment === 'n/a'
    );
  };

  const shouldShowStatusColumn = (jobs: JobApplication[]) => {
    return jobs.some(job =>
      job.interview === true ||
      job.response === 'rejection' ||
      (job.response === 'interview' && job.interview === false)
    );
  };

  // Determine visibility for each column
  // Always hide Assessment, Interview, and Status columns to keep the view simple
  const showAssessmentColumn = false;
  const showInterviewColumn = false;
  const showStatusColumn = false;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getResponseBadge = (response: 'assessment' | 'interview' | 'rejection' | 'no_response' | null) => {
    if (response === null) return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Waiting</Badge>;
    if (response === 'assessment') return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><FileText className="w-3 h-3 mr-1" />Assessment</Badge>;
    if (response === 'interview') return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100"><Users className="w-3 h-3 mr-1" />Interview</Badge>;
    if (response === 'rejection') return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
    if (response === 'no_response') return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />No Response</Badge>;
    return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Waiting</Badge>;
  };

  if (jobs.length === 0) {
    return (
      <Card className="bg-white overflow-visible">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <FileText className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Job Applications</CardTitle>
              <CardDescription>No applications tracked yet</CardDescription>
        </div>
      </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No job applications yet</h3>
            <p className="text-slate-500 mb-6">Start tracking your job search by adding your first application above.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white overflow-visible">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <FileText className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Job Applications</CardTitle>
              <CardDescription>
                {totalJobsCount && filters && Object.values(filters).some(value => value !== 'all')
                  ? `${jobs.length} of ${totalJobsCount} application${totalJobsCount !== 1 ? 's' : ''} shown`
                  : `${jobs.length} application${jobs.length !== 1 ? 's' : ''} tracked`
                }
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-sm">
            {jobs.length} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filter Controls */}
        {filters && onFilterChange && (
          <div className="mb-6 pb-4 border-b border-slate-200">
            {filters && Object.values(filters).some(value => value !== 'all') && onClearFilters && (
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-slate-600 hover:text-slate-800"
                >
                  Clear Filters
                </Button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Response Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Response Status</label>
                <Select value={filters.response} onValueChange={(value) => onFilterChange('response', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All responses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Responses</SelectItem>
                    <SelectItem value="waiting">Waiting</SelectItem>
                    <SelectItem value="assessment" className="text-black focus:bg-gray-100">Assessment</SelectItem>
                    <SelectItem value="interview" className="text-black focus:bg-gray-100">Interview</SelectItem>
                    <SelectItem value="rejection" className="text-black focus:bg-gray-100">Rejected</SelectItem>
                    <SelectItem value="no_response" className="text-black focus:bg-gray-100">No Response</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Decision Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Final Decision</label>
                <Select value={filters.decision} onValueChange={(value) => onFilterChange('decision', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All decisions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Decisions</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="offered">Job Offered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="p-4 bg-white overflow-visible">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-slate-900 text-sm">{job.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <BasicDropdown
                    label=""
                    showLabel={false}
                    icon={<MoreHorizontal className="h-4 w-4" />}
                    className="h-8 w-8 p-0"
                    items={[
                      {
                        id: 'view-details',
                        label: 'View Details',
                        icon: <Eye className="h-4 w-4" />
                      },
                      ...(job.jobLink ? [{
                        id: 'view-job',
                        label: 'View Job Posting',
                        icon: <ExternalLink className="h-4 w-4" />
                      }] : []),
                      {
                        id: 'edit',
                        label: 'Edit',
                        icon: <Edit3 className="h-4 w-4" />
                      },
                      {
                        id: 'delete',
                        label: 'Delete',
                        icon: <Trash2 className="h-4 w-4" />
                      }
                    ]}
                    onChange={(item) => {
                      switch (item.id) {
                        case 'view-details':
                          setSelectedJob(job);
                          break;
                        case 'view-job':
                          window.open(job.jobLink, '_blank', 'noopener,noreferrer');
                          break;
                        case 'edit':
                          onEdit(job);
                          break;
                        case 'delete':
                          onDelete(job.id);
                          break;
                      }
                    }}
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Applied {formatDate(job.appliedDate)}</span>
                      <button
                        onClick={() => setEditingDate({
                          jobId: job.id,
                          field: 'appliedDate',
                          currentDate: job.appliedDate || ''
                        })}
                        className="p-1 hover:bg-slate-200 rounded transition-colors"
                        title="Edit application date"
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">Response</span>
                    <div className="flex-1 ml-2">
                      <Select
                        value={job.response || 'waiting'}
                        onValueChange={(value) => {
                          const responseValue = value === 'waiting' ? null : value as 'assessment' | 'interview' | 'rejection' | 'no_response';
                          const updates: Partial<JobApplication> = { response: responseValue };
                          // If response is rejection or no_response, automatically set decision to Rejected
                          if (responseValue === 'rejection' || responseValue === 'no_response') {
                            updates.decision = 'Rejected';
                          }
                          onUpdate(job.id, updates);
                        }}
                      >
                        <SelectTrigger className="w-full h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="waiting">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              Waiting
                            </div>
                          </SelectItem>
                          <SelectItem value="assessment">
                            <div className="flex items-center gap-2">
                              <FileText className="h-3 w-3" />
                              Assessment
                            </div>
                          </SelectItem>
                          <SelectItem value="interview">
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3" />
                              Interview
                            </div>
                          </SelectItem>
                          <SelectItem value="rejection">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-3 w-3" />
                              Rejected
                            </div>
                          </SelectItem>
                          <SelectItem value="no_response">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-3 w-3" />
                              No Response
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {showAssessmentColumn && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600">Assessment</span>
                      <div className="flex-1 ml-2">
                        <Select
                          value={job.assessment === null ? 'null' : job.assessment === 'n/a' ? 'n/a' : job.assessment.toString()}
                          onValueChange={(value) => {
                            let assessmentValue: boolean | null | 'n/a';
                            if (value === 'null') {
                              assessmentValue = null;
                            } else if (value === 'n/a') {
                              assessmentValue = 'n/a';
                            } else {
                              assessmentValue = value === 'true';
                            }
                            onUpdate(job.id, { assessment: assessmentValue });
                          }}
                        >
                          <SelectTrigger className="w-full h-7 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="null">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                Pending
                              </div>
                            </SelectItem>
                            <SelectItem value="true">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3" />
                                Passed
                              </div>
                            </SelectItem>
                            <SelectItem value="false">
                              <div className="flex items-center gap-2">
                                <XCircle className="h-3 w-3" />
                                Not Passed
                              </div>
                            </SelectItem>
                            <SelectItem value="n/a">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-slate-300" />
                                No Assessment
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {showInterviewColumn && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600">Interview</span>
                      <div className="flex-1 ml-2">
                        <Select
                          value={job.interview === null ? 'null' : job.interview.toString()}
                          onValueChange={(value) => {
                            const interviewValue = value === 'null' ? null : value === 'true';
                            onUpdate(job.id, { interview: interviewValue });
                          }}
                        >
                          <SelectTrigger className="w-full h-7 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="null">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                Pending
                              </div>
                            </SelectItem>
                            <SelectItem value="true">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3" />
                                Scheduled
                              </div>
                            </SelectItem>
                            <SelectItem value="false">
                              <div className="flex items-center gap-2">
                                <XCircle className="h-3 w-3" />
                                No Interview
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {showStatusColumn && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600">Status</span>
                      <div className="flex-1 ml-2">
                        <Select
                          value={job.decision || 'pending'}
                          onValueChange={(value) => {
                            const decisionValue = value === 'pending' ? '' : value;
                            onUpdate(job.id, { decision: decisionValue });
                          }}
                        >
                          <SelectTrigger className="w-full h-7 text-xs">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="pending">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                Pending
                              </div>
                            </SelectItem>
                            <SelectItem value="Rejected">
                              <div className="flex items-center gap-2">
                                <XCircle className="h-3 w-3" />
                                Rejected
                              </div>
                            </SelectItem>
                            <SelectItem value="Offered Job">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3" />
                                Offered Job
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                {job.response && job.responseDate && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Response {formatDate(job.responseDate)}</span>
                      <button
                        onClick={() => setEditingDate({
                          jobId: job.id,
                          field: 'responseDate',
                          currentDate: job.responseDate || ''
                        })}
                        className="p-1 hover:bg-slate-200 rounded transition-colors"
                        title="Edit response date"
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block rounded-md border">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[20%]">Position</TableHead>
                <TableHead className="text-center w-[20%]">Company</TableHead>
                <TableHead className="text-center w-[20%]">Applied</TableHead>
                <TableHead className="text-center w-[20%]">Response Type</TableHead>
                {showAssessmentColumn && <TableHead className="text-center w-[20%]">Assessment</TableHead>}
                {showInterviewColumn && <TableHead className="text-center w-[20%]">Interview</TableHead>}
                {showStatusColumn && <TableHead className="text-center w-[20%]">Status</TableHead>}
                <TableHead className="text-center w-[20%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {jobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-slate-50/50">
                  <TableCell className="text-center">
                    <div className="font-medium text-slate-900 flex items-center justify-center gap-2">
                      {job.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm">
                  {formatDate(job.appliedDate)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="space-y-2">
                      <Select
                        value={job.response || 'waiting'}
                        onValueChange={(value) => {
                          const responseValue = value === 'waiting' ? null : value as 'assessment' | 'interview' | 'rejection' | 'no_response';
                          const updates: Partial<JobApplication> = { response: responseValue };
                          // If response is rejection or no_response, automatically set decision to Rejected
                          if (responseValue === 'rejection' || responseValue === 'no_response') {
                            updates.decision = 'Rejected';
                          }
                          onUpdate(job.id, updates);
                        }}
                      >
                        <SelectTrigger className={`w-full h-8 ${
                          job.response === 'assessment' || job.response === 'interview'
                            ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100'
                            : job.response === 'rejection' || job.response === 'no_response'
                            ? 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100'
                            : ''
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="waiting">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Waiting
                            </div>
                          </SelectItem>
                          <SelectItem value="assessment">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Assessment
                            </div>
                          </SelectItem>
                          <SelectItem value="interview">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Interview
                            </div>
                          </SelectItem>
                          <SelectItem value="rejection">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4" />
                              Rejected
                            </div>
                          </SelectItem>
                          <SelectItem value="no_response">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4" />
                              No Response
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {job.response && job.responseDate && (
                        <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
                          <span>{formatDate(job.responseDate)}</span>
                          <button
                            onClick={() => setEditingDate({
                              jobId: job.id,
                              field: 'responseDate',
                              currentDate: job.responseDate || ''
                            })}
                            className="p-1 hover:bg-slate-200 rounded transition-colors"
                            title="Edit response date"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      {job.response && job.response !== 'no_response' && !job.responseDate && (
                        <Input
                          type="date"
                          placeholder="Response date"
                          className="h-7 text-xs w-full"
                          onChange={(e) => {
                            onUpdate(job.id, { responseDate: e.target.value || null });
                          }}
                        />
                      )}
                    </div>
                  </TableCell>
                  {showAssessmentColumn && (
                    <TableCell className="text-center">
                      <Select
                      value={job.assessment === null ? 'null' : job.assessment === 'n/a' ? 'n/a' : job.assessment.toString()}
                        onValueChange={(value) => {
                          let assessmentValue: boolean | null | 'n/a';
                          if (value === 'null') {
                            assessmentValue = null;
                          } else if (value === 'n/a') {
                            assessmentValue = 'n/a';
                          } else {
                            assessmentValue = value === 'true';
                          }
                        onUpdate(job.id, { assessment: assessmentValue });
                      }}
                      >
                        <SelectTrigger className={`w-[140px] h-8 ${
                          job.assessment === true
                            ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100'
                            : job.assessment === false
                            ? 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100'
                            : ''
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="null">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Pending
                            </div>
                          </SelectItem>
                          <SelectItem value="true">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Passed
                            </div>
                          </SelectItem>
                          <SelectItem value="false">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4" />
                              Not Passed
                            </div>
                          </SelectItem>
                          <SelectItem value="n/a">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full bg-slate-300" />
                              No Assessment
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
                  {showInterviewColumn && (
                    <TableCell className="text-center">
                      <Select
                      value={job.interview === null ? 'null' : job.interview.toString()}
                        onValueChange={(value) => {
                          const interviewValue = value === 'null' ? null : value === 'true';
                        onUpdate(job.id, { interview: interviewValue });
                        }}
                      >
                        <SelectTrigger className="w-[120px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="null">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Pending
                            </div>
                          </SelectItem>
                          <SelectItem value="true">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Scheduled
                            </div>
                          </SelectItem>
                          <SelectItem value="false">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4" />
                              No Interview
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
                  {showStatusColumn && (
                    <TableCell className="text-center flex justify-center">
                      <Select
                        value={job.decision || 'pending'}
                        onValueChange={(value) => {
                          const decisionValue = value === 'pending' ? '' : value;
                          onUpdate(job.id, { decision: decisionValue });
                        }}
                      >
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="pending">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Pending
                            </div>
                          </SelectItem>
                          <SelectItem value="Rejected">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-4 w-4" />
                              Rejected
                            </div>
                          </SelectItem>
                          <SelectItem value="Offered Job">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Offered Job
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
                  <TableCell className="text-center flex justify-center items-center" style={{ height: '50px' }}>
                    <BasicDropdown
                      label=""
                      showLabel={false}
                      icon={<MoreHorizontal className="h-4 w-4" />}
                      items={[
                        {
                          id: 'view-details',
                          label: 'View Details',
                          icon: <Eye className="h-4 w-4" />
                        },
                        ...(job.jobLink ? [{
                          id: 'view-job',
                          label: 'View Job Posting',
                          icon: <ExternalLink className="h-4 w-4" />
                        }] : []),
                        {
                          id: 'edit',
                          label: 'Edit',
                          icon: <Edit3 className="h-4 w-4" />
                        },
                        {
                          id: 'delete',
                          label: 'Delete',
                          icon: <Trash2 className="h-4 w-4" />
                        }
                      ]}
                      onChange={(item) => {
                        switch (item.id) {
                          case 'view-details':
                            setSelectedJob(job);
                            break;
                          case 'view-job':
                            window.open(job.jobLink, '_blank', 'noopener,noreferrer');
                            break;
                          case 'edit':
                            onEdit(job);
                            break;
                          case 'delete':
                            onDelete(job.id);
                            break;
                        }
                      }}
                      className="h-8 w-8 p-0"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Job Details Modal */}
      <BasicModal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title={`Job Application Details - ${selectedJob?.title} at ${selectedJob?.company}`}
        size="full"
      >
        {selectedJob && (
          <>
            {/* Modern Header */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg opacity-10"></div>
                <div className="relative p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                          {selectedJob.title}
                        </h2>
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="font-medium">{selectedJob.company}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            Applied {formatDate(selectedJob.appliedDate)}
                          </div>
                          {selectedJob.response && selectedJob.responseDate && (
                            <div className="flex items-center gap-1">
                              <span>Response {formatDate(selectedJob.responseDate)}</span>
                              <button
                                onClick={() => setEditingDate({
                                  jobId: selectedJob.id,
                                  field: 'responseDate',
                                  currentDate: selectedJob.responseDate || ''
                                })}
                                className="p-1 hover:bg-slate-200 rounded transition-colors"
                                title="Edit response date"
                              >
                                <Edit3 className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getResponseBadge(selectedJob.response)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-6">

                {/* Application Timeline */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Application Timeline
                  </h3>

                  <div className="space-y-4">
                    {/* Applied Step */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <div className="w-0.5 h-8 bg-blue-200 mt-2"></div>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-slate-900">Application Submitted</h4>
                            <p className="text-sm text-slate-600">{formatDate(selectedJob.appliedDate)}</p>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Response Step */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedJob.response ? 'bg-green-500' : 'bg-slate-300'
                        }`}>
                          {selectedJob.response === 'assessment' && <FileText className="h-4 w-4 text-white" />}
                          {selectedJob.response === 'interview' && <Users className="h-4 w-4 text-white" />}
                          {selectedJob.response === 'rejection' && <XCircle className="h-4 w-4 text-white" />}
                          {!selectedJob.response && <Clock className="h-4 w-4 text-white" />}
                        </div>
                        {(selectedJob.response === 'assessment' || selectedJob.response === 'interview') && (
                          <div className="w-0.5 h-8 bg-green-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-slate-900">
                              {selectedJob.response === 'assessment' && 'Assessment Requested'}
                              {selectedJob.response === 'interview' && 'Interview Scheduled'}
                              {selectedJob.response === 'rejection' && 'Application Rejected'}
                              {!selectedJob.response && 'Awaiting Response'}
                            </h4>
                            {selectedJob.response && selectedJob.responseDate && (
                              <p className="text-sm text-slate-600">{formatDate(selectedJob.responseDate)}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {getResponseBadge(selectedJob.response)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Assessment Step */}
                    {(selectedJob.response === 'assessment' || selectedJob.assessment !== null) && (
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            selectedJob.assessment === true ? 'bg-green-500' :
                            selectedJob.assessment === false ? 'bg-red-500' :
                            selectedJob.assessment === 'n/a' ? 'bg-slate-500' : 'bg-slate-300'
                          }`}>
                            {selectedJob.assessment === true && <CheckCircle className="h-4 w-4 text-white" />}
                            {selectedJob.assessment === false && <XCircle className="h-4 w-4 text-white" />}
                            {selectedJob.assessment === 'n/a' && <div className="w-2 h-2 bg-white rounded-full" />}
                            {selectedJob.assessment === null && <Clock className="h-4 w-4 text-white" />}
                          </div>
                          {selectedJob.assessment === true && <div className="w-0.5 h-8 bg-green-200 mt-2"></div>}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-slate-900">
                                {selectedJob.assessment === true && 'Assessment Passed'}
                                {selectedJob.assessment === false && 'Assessment Not Passed'}
                                {selectedJob.assessment === 'n/a' && 'No Assessment Required'}
                                {selectedJob.assessment === null && 'Assessment Pending'}
                              </h4>
                            </div>
                            <Badge variant={
                              selectedJob.assessment === true ? "default" :
                              selectedJob.assessment === false ? "destructive" :
                              selectedJob.assessment === 'n/a' ? "outline" : "secondary"
                            }>
                              {selectedJob.assessment === true && 'Passed'}
                              {selectedJob.assessment === false && 'Failed'}
                              {selectedJob.assessment === 'n/a' && 'N/A'}
                              {selectedJob.assessment === null && 'Pending'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Interview Step */}
                    {(selectedJob.response === 'interview' || selectedJob.assessment === true || selectedJob.assessment === 'n/a' || selectedJob.interview !== null) && (
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            selectedJob.interview === true ? 'bg-green-500' :
                            selectedJob.interview === false ? 'bg-red-500' : 'bg-slate-300'
                          }`}>
                            {selectedJob.interview === true && <CheckCircle className="h-4 w-4 text-white" />}
                            {selectedJob.interview === false && <XCircle className="h-4 w-4 text-white" />}
                            {selectedJob.interview === null && <Users className="h-4 w-4 text-white" />}
                          </div>
                          {selectedJob.interview === true && <div className="w-0.5 h-8 bg-green-200 mt-2"></div>}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-slate-900">
                                {selectedJob.interview === true && 'Interview Scheduled'}
                                {selectedJob.interview === false && 'No Interview'}
                                {selectedJob.interview === null && 'Interview Pending'}
                              </h4>
                            </div>
                            <Badge variant={
                              selectedJob.interview === true ? "default" :
                              selectedJob.interview === false ? "destructive" : "secondary"
                            }>
                              {selectedJob.interview === true && 'Scheduled'}
                              {selectedJob.interview === false && 'No Interview'}
                              {selectedJob.interview === null && 'Pending'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Final Decision */}
                    {(selectedJob.interview === true || selectedJob.response === 'rejection' || selectedJob.decision) && (
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            selectedJob.decision === 'Offered Job' ? 'bg-green-500' :
                            selectedJob.decision === 'Rejected' ? 'bg-red-500' : 'bg-slate-300'
                          }`}>
                            {selectedJob.decision === 'Offered Job' && <CheckCircle className="h-4 w-4 text-white" />}
                            {selectedJob.decision === 'Rejected' && <XCircle className="h-4 w-4 text-white" />}
                            {!selectedJob.decision && <Clock className="h-4 w-4 text-white" />}
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-slate-900">
                                {selectedJob.decision === 'Offered Job' && 'Job Offer Received'}
                                {selectedJob.decision === 'Rejected' && 'Application Rejected'}
                                {!selectedJob.decision && 'Decision Pending'}
                              </h4>
                            </div>
                            <Badge variant={
                              selectedJob.decision === 'Offered Job' ? "default" :
                              selectedJob.decision === 'Rejected' ? "destructive" : "secondary"
                            }>
                              {selectedJob.decision === 'Offered Job' && 'Offered'}
                              {selectedJob.decision === 'Rejected' && 'Rejected'}
                              {!selectedJob.decision && 'Pending'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Job Details Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Job Description Card */}
                  {selectedJob.description && (
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Job Description</h3>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {selectedJob.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Job Link Card */}
                  {selectedJob.jobLink && (
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <LinkIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Job Posting</h3>
                      </div>
                      <div className="space-y-3">
                        <a
                          href={selectedJob.jobLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          View Original Posting
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg break-all">
                          {selectedJob.jobLink}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Application Details Card */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Briefcase className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Application Details</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-600">Application ID</span>
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono">
                          {selectedJob.id.slice(-8)}
                        </code>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-600">Position</span>
                        <span className="text-sm text-slate-900">{selectedJob.title}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-slate-600">Company</span>
                        <span className="text-sm text-slate-900">{selectedJob.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions Card */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <MoreHorizontal className="h-5 w-5 text-orange-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                    </div>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open(selectedJob.jobLink, '_blank', 'noopener,noreferrer')}
                        disabled={!selectedJob.jobLink}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Job Posting
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => navigator.clipboard.writeText(
                          `Job Application: ${selectedJob.title} at ${selectedJob.company}\nStatus: ${selectedJob.decision || 'In Progress'}`
                        )}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Copy Summary
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
          </>
        )}
      </BasicModal>

      {/* Date Editing Modal */}
      <BasicModal
        isOpen={!!editingDate}
        onClose={() => setEditingDate(null)}
        title={`Edit ${editingDate?.field === 'appliedDate' ? 'Application' : 'Response'} Date`}
      >
        {editingDate && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {editingDate.field === 'appliedDate' ? 'Application Date' : 'Response Date'}
              </label>
              <Input
                type="date"
                defaultValue={editingDate.currentDate}
                onChange={(e) => {
                  const newDate = e.target.value;
                  if (newDate) {
                    onUpdate(editingDate.jobId, { [editingDate.field]: newDate });
                    setEditingDate(null);
                  }
                }}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingDate(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const input = document.querySelector('input[type="date"]') as HTMLInputElement;
                  if (input && input.value) {
                    onUpdate(editingDate.jobId, { [editingDate.field]: input.value });
                    setEditingDate(null);
                  }
                }}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </BasicModal>
    </Card>
  );
}
