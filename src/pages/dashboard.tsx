import { NextSeo } from 'next-seo';

import CompactNotificationCenter from '@/components/notifications/CompactNotificationCenter';
import ReportCardsTable from '@/components/table/ReportCardsTable';

const Dashboard = () => {
  return (
    <div className="use-responsive-width">
      <NextSeo title="Assignments" />

      <div>
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
              grades: ['40'],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
