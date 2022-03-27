import { useContext, useEffect } from 'react';

import { NextSeo } from 'next-seo';

import CompactNotificationCenter from '@/components/notifications/CompactNotificationCenter';
import ReportCardsTable from '@/components/table/ReportCardsTable';
import { AppDataContext } from '@/lib/context/AppDataContext';

const Dashboard = () => {
  const { appData, setAppData } = useContext(AppDataContext);

  useEffect(() => {
    setAppData({
      courses: [
        {
          name: 'Advanced Biology',
          grades: [95, 92, 80, 91, 95, 'NG'],
          cellKey: '!!!',
          hash: '!!!',
          credit: 1,
          otherFields: [{ key: 'Course Code', value: 'ADV BIO' }],
          weighted: true,
        },
        {
          name: 'Magnet English',
          grades: [80, 95, 100, 90, 70, 'NG'],
          cellKey: '@@@',
          hash: '@@@',
          credit: 1,
          otherFields: [{ key: 'Course Code', value: 'ADV ENG' }],
          weighted: true,
        },
        {
          name: 'Everyday Algebra I',
          grades: ['P', 'P', '75', 'P', 'P', 'NG'],
          cellKey: '###',
          hash: '###',
          credit: 2,
          otherFields: [{ key: 'Course Code', value: 'ED ALGEBRA I' }],
          weighted: false,
        },
        {
          name: 'US History',
          grades: ['80', '85', 'EXC', '83', '90', 'NG'],
          cellKey: '$$$',
          hash: '$$$',
          credit: 1,
          otherFields: [{ key: 'Course Code', value: 'US HISTORY' }],
          weighted: false,
        },
      ],
      gradingPeriods: [
        {
          name: '1st Nine Weeks',
          code: '1 Nin Wks',
        },
        {
          name: '2nd Nine Weeks',
          code: '2 Nin Wks',
        },
        {
          name: 'Midterm',
          code: 'Final Sem 1',
        },
        {
          name: 'Fall Average',
          code: 'Sem 1 Avg',
        },
        {
          name: '3rd Nine Weeks',
          code: '3 Nin Wks',
        },
        {
          name: '4th Nine Weeks',
          code: '4 Nin Wks',
        },
      ],
      selectedGradingPeriod: 0,
    });
  }, []);

  return (
    <div>
      <NextSeo title="Assignments" />

      <div className="use-responsive-width">
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
      </div>
      <div className="responsive-scrollable">
        {appData ? (
          <ReportCardsTable
            data={appData.courses}
            gradingPeriods={appData.gradingPeriods}
            selected={appData.selectedGradingPeriod}
          />
        ) : (
          <></>
        )}
        {/* <ReportCardsTable
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
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;
