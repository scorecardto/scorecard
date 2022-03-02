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
            {
              cells: ['100', '90', '80', '70'],
              header: 'Grade',
              type: 'GRADE',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
