import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import AssignmentsTable from '@/components/table/AssignmentsTable';

const Index = () => {
  const router = useRouter();
  const { course } = router.query;

  return (
    <div>
      <NextSeo title={`Assignments for ${course}`} />

      <div className="responsive-scrollable">
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
