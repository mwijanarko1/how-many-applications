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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Briefcase,
  Building2,
  Calendar,
  ExternalLink,
  MoreHorizontal,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Eye,
  Link as LinkIcon
} from "lucide-react";

interface JobTableProps {
  jobs: JobApplication[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<JobApplication>) => void;
  onEdit: (job: JobApplication) => void;
}

export default function JobTable({ jobs, onDelete, onUpdate, onEdit }: JobTableProps) {
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getResponseBadge = (response: boolean | null) => {
    if (response === null) return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Waiting</Badge>;
    if (response === true) return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Responded</Badge>;
    return <Badge variant="secondary"><XCircle className="w-3 h-3 mr-1" />No Response</Badge>;
  };

  if (jobs.length === 0) {
    return (
      <Card>
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <FileText className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Job Applications</CardTitle>
              <CardDescription>{jobs.length} application{jobs.length !== 1 ? 's' : ''} tracked</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-sm">
            {jobs.length} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Assessment</TableHead>
                <TableHead>Response</TableHead>
                <TableHead>Interview</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {jobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-slate-900 flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-slate-500" />
                        {job.title}
                      </div>
                  {job.description && (
                        <div className="text-sm text-slate-500 truncate max-w-[180px]">
                      {job.description}
                    </div>
                  )}
                      {job.jobLink && (
                    <a
                      href={job.jobLink}
                      target="_blank"
                      rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View job
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-slate-500" />
                  {formatDate(job.appliedDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                    value={job.assessment === null ? 'null' : job.assessment.toString()}
                      onValueChange={(value) => {
                        const assessmentValue = value === 'null' ? null : value === 'true';
                      onUpdate(job.id, { assessment: assessmentValue });
                    }}
                    >
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Select
                        value={job.response === null ? 'pending' : 'yes'}
                        onValueChange={(value) => {
                          const responseValue = value === 'pending' ? null : true;
                      onUpdate(job.id, { response: responseValue });
                    }}
                      >
                        <SelectTrigger className="w-[120px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Pending
                            </div>
                          </SelectItem>
                          <SelectItem value="yes">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Yes
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {job.responseDate && (
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(job.responseDate)}
                        </div>
                      )}
                      {!job.responseDate && job.response === true && (
                        <Input
                    type="date"
                          placeholder="Response date"
                          className="h-7 text-xs w-[120px]"
                    onChange={(e) => {
                      onUpdate(job.id, { responseDate: e.target.value || null });
                    }}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
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
                      <SelectContent>
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
                  <TableCell>
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
                      <SelectContent>
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedJob(job)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(job)}>
                          <Edit3 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(job.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Job Details Modal */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  {selectedJob.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-base">
                  <Building2 className="h-4 w-4" />
                  {selectedJob.company}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Status Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-sm font-medium text-slate-600">Status</div>
                    <div className="mt-1">
                      {selectedJob.decision === 'Offered Job' && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Offered
                        </Badge>
                      )}
                      {selectedJob.decision === 'Rejected' && (
                        <Badge variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          Rejected
                        </Badge>
                      )}
                      {(!selectedJob.decision || selectedJob.decision === '') && (
                        <Badge variant="secondary">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-sm font-medium text-slate-600">Response</div>
                    <div className="mt-1">
                      {getResponseBadge(selectedJob.response)}
                    </div>
                  </div>

                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-sm font-medium text-slate-600">Assessment</div>
                    <div className="mt-1">
                      {selectedJob.assessment === null && (
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      {selectedJob.assessment === true && (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Passed
                        </Badge>
                      )}
                      {selectedJob.assessment === false && (
                        <Badge variant="secondary">
                          <XCircle className="w-3 h-3 mr-1" />
                          Not Passed
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-sm font-medium text-slate-600">Interview</div>
                    <div className="mt-1">
                      {selectedJob.interview === null && (
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      {selectedJob.interview === true && (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Scheduled
                        </Badge>
                      )}
                      {selectedJob.interview === false && (
                        <Badge variant="secondary">
                          <XCircle className="w-3 h-3 mr-1" />
                          No Interview
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-4">
                  {/* Applied Date */}
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-blue-900">Applied Date</div>
                      <div className="text-sm text-blue-700">{formatDate(selectedJob.appliedDate)}</div>
                    </div>
                  </div>

                  {/* Job Link */}
                  {selectedJob.jobLink && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <LinkIcon className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-green-900">Job Posting</div>
                        <a
                          href={selectedJob.jobLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green-700 hover:text-green-800 underline break-all"
                        >
                          {selectedJob.jobLink}
                        </a>
                      </div>
                      <ExternalLink className="h-4 w-4 text-green-600" />
                    </div>
                  )}

                  {/* Description */}
                  {selectedJob.description && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-slate-600" />
                        <h3 className="text-lg font-medium text-slate-900">Job Description</h3>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {selectedJob.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Response Date */}
                  {selectedJob.response && selectedJob.responseDate && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-sm font-medium text-green-900">Response Received</div>
                        <div className="text-sm text-green-700">{formatDate(selectedJob.responseDate)}</div>
                      </div>
                    </div>
                  )}

                  {/* Application ID */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="text-xs font-mono text-slate-500 bg-slate-200 px-2 py-1 rounded">
                      ID: {selectedJob.id.slice(-8)}
                    </div>
                  </div>
      </div>
    </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
