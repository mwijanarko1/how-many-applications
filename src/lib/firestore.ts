import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { JobApplication, JobApplicationFormData } from '@/types/jobApplication';

const COLLECTION_NAME = 'jobApplications';

// Firestore document interface (matches Firestore data structure)
interface FirestoreJobApplication {
  title: string;
  company: string;
  description: string;
  jobLink: string;
  appliedDate: string;
  assessment: boolean | null | 'n/a';
  response: 'assessment' | 'interview' | 'rejection' | null;
  responseDate: Timestamp | null;
  interview: boolean | null;
  decision: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Convert Firestore timestamp to string for our JobApplication interface
const convertTimestampToString = (timestamp: Timestamp | null): string | null => {
  return timestamp ? timestamp.toDate().toISOString().split('T')[0] : null;
};

// Convert string date to Firestore timestamp
const convertStringToTimestamp = (dateString: string | null): Timestamp | null => {
  return dateString ? Timestamp.fromDate(new Date(dateString)) : null;
};

// Get all job applications for a user
export const getUserJobApplications = async (userId: string): Promise<JobApplication[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('appliedDate', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const jobs: JobApplication[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      jobs.push({
        id: doc.id,
        title: data.title,
        company: data.company,
        description: data.description,
        jobLink: data.jobLink,
        appliedDate: data.appliedDate,
        assessment: data.assessment,
        response: data.response,
        responseDate: convertTimestampToString(data.responseDate),
        interview: data.interview,
        decision: data.decision,
      });
    });

    return jobs;
  } catch (error) {
    console.error('Error getting job applications:', error);
    throw error;
  }
};

// Add a new job application
export const addJobApplication = async (
  userId: string,
  jobData: JobApplicationFormData
): Promise<string> => {
  try {
    const docData = {
      ...jobData,
      userId,
      assessment: null,
      response: null,
      responseDate: null,
      interview: null,
      decision: '',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding job application:', error);
    throw error;
  }
};

// Update a job application
export const updateJobApplication = async (
  jobId: string,
  updates: Partial<JobApplication>
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, jobId);

    // Prepare update data with proper typing
    const updateData: Partial<FirestoreJobApplication> = {
      updatedAt: Timestamp.now(),
    };

    // Copy over the fields that can be updated
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.company !== undefined) updateData.company = updates.company;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.jobLink !== undefined) updateData.jobLink = updates.jobLink;
    if (updates.appliedDate !== undefined) updateData.appliedDate = updates.appliedDate;
    if (updates.assessment !== undefined) updateData.assessment = updates.assessment;
    if (updates.response !== undefined) updateData.response = updates.response;
    if (updates.responseDate !== undefined) updateData.responseDate = convertStringToTimestamp(updates.responseDate);
    if (updates.interview !== undefined) updateData.interview = updates.interview;
    if (updates.decision !== undefined) updateData.decision = updates.decision;

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating job application:', error);
    throw error;
  }
};

// Delete a job application
export const deleteJobApplication = async (jobId: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, jobId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting job application:', error);
    throw error;
  }
};

// Migrate data from localStorage to Firestore
export const migrateLocalStorageToFirestore = async (userId: string): Promise<void> => {
  try {
    const localJobs = localStorage.getItem('jobApplications');
    if (!localJobs) return;

    const parsedJobs = JSON.parse(localJobs) as JobApplication[];

    // Add userId to each job and save to Firestore
    for (const job of parsedJobs) {
      await addJobApplication(userId, {
        title: job.title,
        company: job.company,
        description: job.description,
        jobLink: job.jobLink,
        appliedDate: job.appliedDate,
      });

      // Update with additional fields if they exist
      if (job.assessment !== null || job.response !== null || job.interview !== null || job.decision !== '') {
        const newJobId = await addJobApplication(userId, {
          title: job.title,
          company: job.company,
          description: job.description,
          jobLink: job.jobLink,
          appliedDate: job.appliedDate,
        });

        await updateJobApplication(newJobId, {
          assessment: job.assessment,
          response: job.response,
          responseDate: job.responseDate,
          interview: job.interview,
          decision: job.decision,
        });
      }
    }

    // Clear localStorage after successful migration
    localStorage.removeItem('jobApplications');
  } catch (error) {
    console.error('Error migrating data:', error);
    throw error;
  }
};
