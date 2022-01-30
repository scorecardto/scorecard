import { useState } from 'react';

import TableDataContainer from '@/components/interactive/TableDataContainer';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const [selectedColState, setSelectedColState] = useState(1);

  const tableData: any[][] = [
    // eslint-disable-next-line react/jsx-key
    ['Spanish I', 'Teacher 1', 'COURSE CODE 1', '100'],
    ['Spanish II', 'Teacher 2', 'COURSE CODE 2', '90'],
    ['Spanish III', 'Teacher 3', 'COURSE CODE 3', '80'],
    ['AP Spanish IV', 'Teacher 4', 'COURSE CODE 4', '70'],
    ['Spanish V', 'Teacher 5', 'COURSE CODE 5', '60'],
  ];
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <TableDataContainer
        data={tableData}
        sortData={(selectedCol, oldData) => {
          const selectedColIdx = Math.abs(selectedCol) - 1;
          const selectedColInverse = selectedCol > 0 ? 1 : -1;

          return oldData.sort((a, b) => {
            if (a[selectedColIdx] > b[selectedColIdx]) {
              return 1 * selectedColInverse;
            }

            if (a[selectedColIdx] < b[selectedColIdx]) {
              return -1 * selectedColInverse;
            }
            return 0;
          });
        }}
        selectedCol={selectedColState}
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
