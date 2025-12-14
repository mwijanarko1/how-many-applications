"use client";

import { useState, useEffect } from "react";
import { JobApplicationFormData, JobApplication } from "@/types/jobApplication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BasicModal from "@/components/smoothui/basic-modal";
import { Plus, Edit3, Building2, Briefcase, Link as LinkIcon, Calendar, X } from "lucide-react";

interface JobFormProps {
  onSubmit: (jobData: JobApplicationFormData) => void;
  editingJob?: JobApplication | null;
  onCancelEdit?: () => void;
}

export default function JobForm({ onSubmit, editingJob, onCancelEdit }: JobFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<JobApplicationFormData>({
    title: "",
    company: "",
    description: "",
    jobLink: "",
    appliedDate: new Date().toISOString().split('T')[0],
  });

  // Populate form when editing and open dialog
  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title,
        company: editingJob.company,
        description: editingJob.description,
        jobLink: editingJob.jobLink,
        appliedDate: editingJob.appliedDate,
      });
      setIsOpen(true); // Open dialog when editing
    }
  }, [editingJob]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);

    // Close dialog and reset form only if not editing
    if (!editingJob) {
      setIsOpen(false);
      setFormData({
        title: "",
        company: "",
        description: "",
        jobLink: "",
        appliedDate: new Date().toISOString().split('T')[0],
      });
    }
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    if (!editingJob) {
      setFormData({
        title: "",
        company: "",
        description: "",
        jobLink: "",
        appliedDate: new Date().toISOString().split('T')[0],
      });
    }
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const isEditing = !!editingJob;

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={handleOpenDialog}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-black to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
      >
        <Plus className="mr-3 h-6 w-6" />
        {isEditing ? 'Edit Job Application' : 'Add New Job Application'}
      </Button>

      {/* Modal */}
      <BasicModal
        isOpen={isOpen}
        onClose={handleCloseDialog}
        title={
          isEditing ? "Edit Job Application" : "Add New Job Application"
        }
        size="xl"
      >

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
                  <Briefcase className="h-4 w-4" />
                  Job Title *
                </Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Senior Software Engineer"
                  className="transition-colors focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2 text-sm font-medium">
                  <Building2 className="h-4 w-4" />
                  Company *
                </Label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Google Inc."
                  className="transition-colors focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Job Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe the role, requirements, or any notes about this position..."
                className="transition-colors focus:ring-2 resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Optional: Add details about the job requirements or your thoughts
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobLink" className="flex items-center gap-2 text-sm font-medium">
                <LinkIcon className="h-4 w-4" />
                Job Application Link
              </Label>
              <Input
                type="url"
                id="jobLink"
                name="jobLink"
                value={formData.jobLink}
                onChange={handleInputChange}
                placeholder="https://company.com/careers/job-id"
                className="transition-colors focus:ring-2"
              />
              <p className="text-xs text-muted-foreground">
                Optional: Link to the job posting or application page
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="appliedDate" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Applied Date *
              </Label>
              <Input
                type="date"
                id="appliedDate"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleInputChange}
                required
                className="transition-colors focus:ring-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 h-11 text-base font-medium"
                size="lg"
              >
                {isEditing ? (
                  <>
                    <Edit3 className="mr-2 h-4 w-4" />
                    Update Application
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Application
                  </>
                )}
              </Button>
              <Button
                type="button"
                onClick={handleCloseDialog}
                variant="outline"
                className="flex-1 h-11 text-base font-medium"
                size="lg"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
      </BasicModal>
    </>
  );
}
