import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import AssignmentsTable from '@/components/table/AssignmentsTable';

const Index = () => {
  return (
    <div>
      <NextSeo title="Assignments" />
      <p>Scorecard Boilerplate</p>
      <Link href={'/dashboard'}>
        <a>link</a>
      </Link>
      <div className="use-responsive-width">
        <motion.div layoutId={'table'}>
          <AssignmentsTable
            data={[
              [
                {
                  cells: ['Quiz 1', 'Quiz 2'],
                  header: 'Assignment',
                  type: 'OTHER_FIELD',
                },
                {
                  cells: ['Jan 1', 'Jan 1'],
                  header: 'Due Date',
                  type: 'OTHER_FIELD',
                },
                {
                  cells: ['100', '30'],
                  header: 'Grade',
                  type: 'GRADE',
                },
              ],
              {
                name: 'Quizzes',
                weight: 60,
              },
              [
                {
                  cells: ['Project 1wkefmkwmefkm', 'Project 2'],
                  header: 'Assignment',
                  type: 'OTHER_FIELD',
                },
                {
                  cells: ['Jan 1', 'Jan 1'],
                  header: 'Due Date',
                  type: 'OTHER_FIELD',
                },
                {
                  cells: ['100', '30'],
                  header: 'Grade',
                  type: 'GRADE',
                },
              ],
              {
                name: 'Projects',
                weight: 40,
              },
            ]}
          />
        </motion.div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'Assignments',
    },
  };
}

export default Index;
