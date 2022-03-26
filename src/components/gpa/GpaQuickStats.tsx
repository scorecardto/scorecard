import React from 'react';

// type IGpaQuickStatsProps = {};

export default function GpaQuickStats(/* {}: IGpaQuickStatsProps */) {
  return (
    <div className="_gpa-quick-stats bg-day-200 dark:bg-night-200 w-full leading-loose px-4 py-2 border-day-300 dark:border-night-300 border">
      <p>Quick Info</p>
      <div className="text-day-400 dark:text-night-400">
        <p>Unweighted GPA: {3.0}</p>
        <p>Weighted Classes: {'8/8'}</p>
      </div>
    </div>
  );
}
