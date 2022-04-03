import { CategoryAssignments } from './CategoryAssignments';
import { Course } from './Course';

export interface CourseAssignments extends Course {
  gradebook: CategoryAssignments[][];
}
