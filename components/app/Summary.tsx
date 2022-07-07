import { IoTrendingUp } from "react-icons/io5";
import CourseCard from "./CourseCard";
import NotificationSummary from "./NotificationSummary";
import Toolbar from "./Toolbar";

export default function Summary() {
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
            <CourseCard
              onClick={() => {}}
              courseName="Course Name"
              description1="Description Line 1"
              description2="Description Line 2"
              grade="100"
              id="course-id"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
