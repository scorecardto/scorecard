import { useContext, useState } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { DataContext } from "scorecard-types";
import Dropdown from "../core/input/Dropdown";
import AssignmentsViewer from "./assignments/AssignmentsViewer";
import Context from "./Context";
import CourseCard from "./CourseCard";
import NotificationSummary from "./NotificationSummary";
import Toolbar from "./Toolbar";

export default function Summary() {
  const data = useContext(DataContext);

  const [course, setCourse] = useState(-1);

  return (
    <div className="w-full">
      <AssignmentsViewer course={course} setCourse={setCourse} />
      <div className="max-w-6xl mx-auto px-8 flex flex-col gap-8 pt-8">
        <div className="flex flex-row justify-between items-end gap-8">
          <h1 className="flex-shrink-0">Your Scorecard</h1>
          <div className="flex gap-2">
            <Dropdown
              options={data.data?.gradeCategoryNames ?? []}
              selected={data.gradeCategory}
              setSelected={data.setGradeCategory}
            />
            <Context />
          </div>
        </div>

        <div className="flex flex-row justify-between items-end gap-8">
          <NotificationSummary
            iconType="HEART"
            title="Notifications Appear Here"
            details="Thanks for chosing Scorecard, the free gradebook viewer for Frontline."
          />

          <Toolbar />
        </div>
      </div>

      <div className="w-full bg-mono-l-200 dark:bg-mono-d-200">
        <div className="max-w-6xl mx-auto p-8 relative">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.data?.courses.map((course, idx) => {
              return (
                <CourseCard
                  key={idx}
                  onClick={() => {
                    setCourse(idx);
                  }}
                  courseName={data.courseDisplayNames[course.key] ?? course.name}
                  description1={course.key}
                  description2=" "
                  grade={course.grades[data.gradeCategory]?.value ?? "NG"}
                  id={course.key}
                />
                //
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
