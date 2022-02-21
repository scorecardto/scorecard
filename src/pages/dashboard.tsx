import { motion } from 'framer-motion';
import Link from 'next/link';

import ReportCardsTable from '@/components/table/ReportCardsTable';

const Dashboard = () => {
  return (
    <div className="use-responsive-width">
      <p>Scorecard Boilerplate</p>
      <Link href={'/assignments/'}>
        <a>link</a>
      </Link>
      <motion.div layoutId={'table'}>
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
      </motion.div>
    </div>
  );
};

export default Dashboard;
