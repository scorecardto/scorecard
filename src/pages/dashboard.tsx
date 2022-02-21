import { motion } from 'framer-motion';
import Link from 'next/link';

import ReportCardsTable from '@/components/table/ReportCardsTable';

const Dashboard = () => {
  return (
    <div className="use-responsive-width">
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
      <Link href={'/insights/'}>
        <a>link</a>
      </Link>
    </div>
  );
};

export default Dashboard;
