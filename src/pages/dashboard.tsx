import { NextSeo } from 'next-seo';

import ReportCardsTable from '@/components/table/ReportCardsTable';

const Dashboard = () => {
  return (
    <div className="use-responsive-width">
      <NextSeo title="Assignments" />

      <div>
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
              grades: [
                <span
                  className="block from-theme-600 to-theme-700 bg-gradient-to-tr w-fit py-1 px-3 rounded-xl my-1 text-white ml-auto"
                  key={0}
                >
                  {/* // <span
                //   key={0}
                //   className="float-right from-theme-600 to-theme-700 bg-gradient-to-tr py-1.5 px-3 rounded-xl h-9"
                // > */}
                  40
                </span>,
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
