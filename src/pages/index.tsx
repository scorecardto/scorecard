import { useState } from 'react';

import ReportCardsTable from '@/components/interactive/ReportCardsTable';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const [selectedColState, setSelectedColState] = useState(1);

  const tableData: any[][] = [
    ['Spanish I', 'Spanish II', 'Spanish III', 'AP Spanish IV', 'Spanish V'],
    ['Teacher 1', 'Teacher 2', 'Teacher 3', 'Teacher 4', 'Teacher 5'],
    [
      'COURSE CODE 1',
      'COURSE CODE 2',
      'COURSE CODE 3',
      'COURSE CODE 4',
      'COURSE CODE 5',
    ],
    ['100', '90', '80', '70', '60'],
  ];
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <ReportCardsTable
        data={tableData}
        columns={['Class', 'Teacher', 'Course Code', 'Grade']}
        // sortData={(selectedCol, oldData) => {
        //   const selectedColIdx = Math.abs(selectedCol) - 1;
        //   const selectedColInverse = selectedCol > 0 ? 1 : -1;

        //   return oldData.sort((a, b) => {
        //     if (a[selectedColIdx] > b[selectedColIdx]) {
        //       return 1 * selectedColInverse;
        //     }

        //     if (a[selectedColIdx] < b[selectedColIdx]) {
        //       return -1 * selectedColInverse;
        //     }
        //     return 0;
        //   });
        // }}
        // selectedCol={selectedColState}
      />

      <button
        onClick={() => {
          setSelectedColState(selectedColState * -1);
        }}
      >
        Change col
      </button>

      <p>Scorecard Boilerplate</p>
    </Main>
  );
};

export default Index;
