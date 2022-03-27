import { Course } from './types/Course';
import { GPAFormula } from './types/GPAFormula';

export const getPointsFor = (
  grade: string | number,
  weighted: boolean,
  formula: GPAFormula
): number => {
  const asInt = typeof grade === 'string' ? parseInt(grade, 10) : grade;

  if (!Number.isNaN(asInt)) {
    return (asInt + (formula.weighted && weighted ? 10 : 0) - 60) / 10;
  }

  return -1;
};

export const getGPA = (
  courses: Course[],
  gradingPeriod: number,
  formula: GPAFormula
): number => {
  let total: number = 0;
  let count: number = 0;

  courses.forEach((course) => {
    const points = getPointsFor(
      course.grades[gradingPeriod] ?? 'NG',
      course.weighted,
      formula
    );

    if (points !== -1) {
      total += points * course.credit;
      count += course.credit;
    }
  });

  if (count === 0) {
    return -1;
  }

  return Math.round((total / count) * 100) / 100;
};
