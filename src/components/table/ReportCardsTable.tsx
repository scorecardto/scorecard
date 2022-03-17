import React, { ReactElement, useState } from 'react';

import { IoBookmarks, IoBookmark } from 'react-icons/io5';

import SelectorCard from '../card/SelectorCard';
import { STATIC_CARD_ICON_STYLES } from '../card/StaticCard';
import TextCard from '../card/TextCard';
import TableColumn, {
  ColumnStringContents,
  SetColumnShowingCallback,
} from './TableColumn';
import { transpose } from '@/lib/Util';

type Props = {
  data: ColumnStringContents[];
  grades: {
    name: string;
    grades: JSX.Element[];
  }[];
};

export default function ReportCardsTable({ data, grades }: Props) {
  const [, setShownColumns] = useState<boolean[]>(
    new Array(data.length).fill(true)
  );

  const [, setShownColumnSetters] = useState<
    (SetColumnShowingCallback | undefined)[]
  >(new Array(data.length));

  const createIsColumnShowing = (idx: number) => {
    return (isShowing: boolean) => {
      setShownColumns((cols) => {
        const newCols = Array.from(cols);
        newCols[idx] = isShowing;
        return newCols;
      });
    };
  };

  const [gradingPeriod, setGradingPeriod] = useState(0);

  const createGetSetIsColumnShowing = (idx: number) => {
    return (setIsShowing: SetColumnShowingCallback) => {
      setShownColumnSetters((colSetters) => {
        const newColSetters = Array.from(colSetters);
        newColSetters[idx] = setIsShowing;
        return newColSetters;
      });
    };
  };

  const [sortBy, setSortBy] = useState(1);

  const createHeader = (
    header: string,
    idx: number,
    totalLength: number
  ): ReactElement => {
    return (
      <>
        <div className="-ml-3 flex flex-row flex-nowrap justify-between">
          <TextCard
            onClick={() => {
              setSortBy((sort) => {
                if (Math.abs(sort) === idx + 1) {
                  return sort * -1;
                }
                return idx + 1;
              });
            }}
          >
            {header}
          </TextCard>
          {idx === totalLength ? (
            <div className="_col-changer w-48 flex flex-row justify-end">
              <SelectorCard
                selected={gradingPeriod}
                setSelected={setGradingPeriod}
                options={grades.map((g) => g.name)}
                cardIcon={<IoBookmarks className={STATIC_CARD_ICON_STYLES} />}
                icon={<IoBookmark className={STATIC_CARD_ICON_STYLES} />}
                selectedIcon={
                  <IoBookmark className={STATIC_CARD_ICON_STYLES} />
                }
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };

  const sort = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    data: ColumnStringContents[],
    // eslint-disable-next-line @typescript-eslint/no-shadow
    sortBy: number
  ): ColumnStringContents[] => {
    const sortByIdx = Math.abs(sortBy) - 1;
    const sortAsc = sortBy > 0 ? 1 : -1;

    const sortedCells: (ReactElement | HTMLElement | string)[][] = transpose(
      transpose(
        data.map((cols) => {
          return cols.cells;
        })
      ).sort(
        (
          a: (ReactElement | HTMLElement | string)[],
          b: (ReactElement | HTMLElement | string)[]
        ) => {
          const aCell = a[sortByIdx];
          const bCell = b[sortByIdx];

          if (aCell == null || bCell == null) {
            if (aCell == null && bCell == null) return 0;
            if (aCell == null) return -1 * sortAsc;
            return 1 * sortAsc;
          }

          if (aCell > bCell) {
            return 1 * sortAsc;
          }

          if (aCell < bCell) {
            return -1 * sortAsc;
          }

          return 0;
        }
      )
    );

    return data.map((col: ColumnStringContents, idx) => {
      const returnable = col;
      // @ts-ignore
      returnable.cells = sortedCells[idx];
      return returnable;
    });
  };
  const [hoveredRow, setHoveredRow] = useState<number>(-1);

  const sorted = sort(data, sortBy);
  return (
    <div className="_report-cards-table flex">
      <div className="_report-cards-col-container flex w-fit group-2">
        {sorted.map((column, idx, array) => {
          return (
            <TableColumn
              cells={column.cells.map((str, idx2) => {
                return (
                  <span className="h-8 whitespace-nowrap block mt-2" key={idx2}>
                    {str}
                  </span>
                );
              })}
              header={createHeader(column.header, idx, array.length)}
              type={column.type}
              key={idx}
              setComponentShowing={createIsColumnShowing(idx)}
              getSetComponentShowing={createGetSetIsColumnShowing(idx)}
              amFirstColumn={idx === 0}
              amLastColumn={false}
              hoveredRow={hoveredRow}
              onCellMouseOver={(idx2) => {
                setHoveredRow(idx2);
              }}
              clickable
            />
          );
        })}

        <TableColumn
          cells={grades[gradingPeriod]?.grades ?? []}
          header={createHeader('Grade', sorted.length, sorted.length)}
          type={'GRADE'}
          key={sorted.length}
          setComponentShowing={createIsColumnShowing(sorted.length)}
          getSetComponentShowing={createGetSetIsColumnShowing(sorted.length)}
          amFirstColumn={sorted.length === 0}
          amLastColumn={true}
          hoveredRow={hoveredRow}
          onCellMouseOver={(idx2) => {
            setHoveredRow(idx2);
          }}
          clickable
        />
      </div>
    </div>
  );
}
