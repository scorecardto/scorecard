import { CourseAssignments } from './CourseAssignments';

export type EncryptedRecord = {
  data: string;
  date: number;
  includesAssignments: false;
};

export type DecryptedRecord = {
  data: CourseAssignments[];
  date: number;
  includesAssignments: false;
};
