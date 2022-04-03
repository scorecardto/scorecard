import { CourseAssignments } from './types/CourseAssignments';

export const calculateAverage = (
  gradebook: CourseAssignments,
  gradingPeriod: number
): number => {
  let categoriesAverage = 0;
  let categoryCredits = 0;

  gradebook.gradebook[gradingPeriod]?.forEach((category) => {
    let assignmentsAverage = 0;
    let assignmentCredits = 0;

    category.assignments.forEach((assignment) => {
      if (
        assignment.dropped ||
        assignment.weight <= 0 ||
        assignment.grade === ''
      )
        return;

      const gradeAsInt = parseInt(assignment.grade.toString(), 10);

      if (!Number.isNaN(gradeAsInt)) {
        assignmentsAverage += gradeAsInt * assignment.weight;
      } else if (assignment.grade !== 'MSG') {
        return;
      }

      assignmentCredits += assignment.weight;
    });

    categoriesAverage +=
      (assignmentsAverage / assignmentCredits) * category.category.weight;
    categoryCredits += category.category.weight;
  });

  if (categoryCredits <= 0) return -1;

  return categoriesAverage / categoryCredits;
};
