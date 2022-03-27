import { Course } from './types/Course';
import { GPAFormula } from './types/GPAFormula';

export const getGPA = (
  courses: Course[],
  gradingPeriod: number,
  formula: GPAFormula
) => {
  let total: number = 0;
  let count: number = 0;

  courses.forEach((course) => {
    const raw = course.grades[gradingPeriod] ?? '';
    const asInt = typeof raw === 'string' ? parseInt(raw, 10) : raw;

    if (!Number.isNaN(asInt)) {
      total += asInt + (formula.weighted && course.weighted ? 10 : 0);
      count += 1;
    }
  });

  return Math.round(((total / count - 60) / 10) * 100) / 100;
};
