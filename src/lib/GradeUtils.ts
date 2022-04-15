import { CategoryAssignments } from './types/CategoryAssignments';
import { CourseAssignments } from './types/CourseAssignments';

export const calculateCategory = (
  category: CategoryAssignments
): { average: number; dropped?: boolean } => {
  let assignmentsAverage = 0;
  let assignmentCredits = 0;

  category.assignments.forEach((assignment) => {
    if (
      assignment.dropped ||
      assignment.weight <= 0 ||
      assignment.grade === ''
    ) {
      return;
    }

    const gradeAsInt = parseInt(assignment.grade.toString(), 10);

    if (!Number.isNaN(gradeAsInt)) {
      assignmentsAverage += gradeAsInt * assignment.weight;
    } else if (assignment.grade !== 'MSG') {
      return;
    }

    assignmentCredits += assignment.weight;
  });

  if (assignmentCredits <= 0) return { average: 0, dropped: true };

  return {
    average: assignmentsAverage / assignmentCredits,
  };
};

export const calculateAverage = (
  categories: { average: number; dropped?: boolean; weight: number }[]
): number => {
  let categoriesAverage = 0;
  let categoryCredits = 0;

  categories.forEach((category) => {
    categoriesAverage += category.average * category.weight;
    categoryCredits += !category.dropped ? category.weight : 0;
  });

  if (categoryCredits <= 0) return -1;

  return categoriesAverage / categoryCredits;
};

export const calculateAll = (
  gradebook: CourseAssignments,
  gradingPeriod: number
): number => {
  return calculateAverage(
    gradebook.gradebook[gradingPeriod]?.map((category) => {
      const calculated = calculateCategory(category);
      return {
        ...calculated,
        weight: category.category.weight,
      };
    }) ?? []
  );
};

export const parseNumberRevert = (
  n: string | number | undefined,
  strict?: boolean
): number | string | undefined => {
  if (typeof n === 'number' || n === undefined) return n;

  const asInt = parseInt(n, 10);
  if (Number.isNaN(asInt) || (strict && Number.isNaN(+n))) return n;
  return asInt;
};

export const parseNumberForce = (
  n: string | number | undefined
): number | undefined => {
  if (typeof n === 'number' || n === undefined) return n;

  const asInt = parseInt(n, 10);
  if (Number.isNaN(asInt)) return undefined;
  return asInt;
};
