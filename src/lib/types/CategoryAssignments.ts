import { Assignment } from './Assignment';
import GradebookCategory from './GradebookCategory';

export type CategoryAssignments = {
  category: GradebookCategory;
  assignments: Assignment[];
};
