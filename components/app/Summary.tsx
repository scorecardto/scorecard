import { useContext } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { DataContext } from "scorecard-types";
import CourseCard from "./CourseCard";
import NotificationSummary from "./NotificationSummary";
import Toolbar from "./Toolbar";

export default function Summary() {
  const data = useContext(DataContext);

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-8 flex flex-col gap-8 pt-8">
        <h1>Your Scorecard</h1>

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
            {data.data?.data?.map((course, idx) => {
              return (
                <CourseCard
                  key={idx}
                  onClick={() => {}}
                  courseName={course.name}
                  description1={course.key}
                  description2=" "
                  grade={course.grades[0]?.value ?? "NG"}
                  id={course.key}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
