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
            {
              assignment: 'Unit Test',
              course: 'Geometry',
              grade: '96',
              newAverage: 100,
              oldAverage: 99,
            }
            // undefined
          }
          totalNotifications={46}
          totalMissingAssignments={1}
        />

        <div className="mt-10" />

        <ReportCardsTable
          data={[
            {
              cells: [
                'Biology',
                'Computer Science',
                'English',
                'Geometry',
                'SciTech',
                'Spanish',
                'World Geography',
              ],
              header: 'Course',
              type: 'COURSE_NAME',
            },
            {
              cells: [
                'ADV BIO',
                'AP COMP SCI',
                'ADV ENG LANG',
                'ADV GEOMETRY',
                'ADV ENG SCI',
                'ADV SPANISH III',
                'ADV W GEO',
              ],
              header: 'Course Code',
              type: 'OTHER_FIELD',
            },
          ]}
          grades={[
            // { name: '1st Nine Weeks', grades: ['100', '100', '100', '100'] },
            // { name: '2nd Nine Weeks', grades: ['90', '90', '90', '90'] },
            {
              name: '3rd Nine Weeks',
              grades: ['95', '96', '96', '100', '94', '95', '98'],
            },
            {
              name: '4th Nine Weeks',
              grades: ['NG', '100', 'NG', '100', '99', '60', '50'],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
