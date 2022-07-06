import { IoTrendingUp } from "react-icons/io5";
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

      <div className="w-full h-20 bg-mono-l-200 dark:bg-mono-d-200"></div>
    </div>
  );
}
