import { NextSeo } from 'next-seo';

import CompactNotificationCenter from '@/components/notifications/CompactNotificationCenter';
import ReportCardsTable from '@/components/table/ReportCardsTable';

const Dashboard = () => {
  return (
    <div className="use-responsive-width">
      <NextSeo title="Assignments" />

      <div>
        <div className="mt-10" />
        <CompactNotificationCenter
          notification={
            //   {
            //   assignment: 'Unit Test',
            //   course: 'Geometry',
            //   grade: 'MSG',
            //   newAverage: 75,
            //   oldAverage: 96,
            // }
            undefined
          }
          totalNotifications={0}
          totalMissingAssignments={0}
        />

        <div className="mt-10" />

        <ReportCardsTable
          data={[
            {
              cells: ['Biology', 'Chemistry', 'Physics I', 'Physics 2'],
              header: 'Course',
              type: 'COURSE_NAME',
            },
            {
              cells: ['ADV BIO', 'ADV CHEM', 'AP PHYS I', 'AP PHYS 2'],
              header: 'Course Code',
              type: 'OTHER_FIELD',
            },
          ]}
          grades={[
            // { name: '1st Nine Weeks', grades: ['100', '100', '100', '100'] },
            // { name: '2nd Nine Weeks', grades: ['90', '90', '90', '90'] },
            {
              name: 'Midterm',
              grades: ['80', '85', '90', 'P'],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
