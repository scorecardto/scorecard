import ReportCardsTable from '@/components/interactive/ReportCardsTable';
import { ColumnStringContents } from '@/components/interactive/TableColumn';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const tableData: ColumnStringContents[] = [
    {
      header: 'Course Name',
      type: 'COURSE_NAME',
      cells: ['Algebra', 'Geometry', 'Algebra II', 'Pre Calculus', 'Calculus'],
    },
    {
      header: 'Course Code',
      type: 'OTHER_FIELD',
      cells: [
        'ALGEBRA',
        'ADV GEOMETRY',
        'ADV ALGEBRA',
        'PRE CALCULUS',
        'AP CALCULUS BC',
      ],
    },
    {
      header: 'Grade',
      type: 'GRADE',
      cells: ['100', '30', '50', 'NG', 'P'],
    },
  ];

  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <ReportCardsTable data={tableData} />

      <p>Scorecard Boilerplate</p>
    </Main>
  );
};

export default Index;
