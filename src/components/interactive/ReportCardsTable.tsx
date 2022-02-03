import React, { Component } from 'react';

import TableColumn from './TableColumn';

type ReportCardsTableProps = {
  data: Element /* column */[] /* row */[];
  columns: string[];
};

type ReportCardsTableState = {
  columns: JSX.Element[];
  columnWidths: number[];
};

export default class ReportCardsTable extends Component<
  ReportCardsTableProps,
  ReportCardsTableState
> {
  state = {
    columns: [],
    columnWidths: [],
  };

  componentDidMount() {
    (async () => {
      for (let i = 0; i < this.props.data.length; i += 1) {
        const cells = this.props.data[i];
        if (cells == null) {
          return;
        }

        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => {
          const columnIndex = i;
          const col = (
            <TableColumn
              cells={cells}
              columnIndex={columnIndex}
              totalColumns={this.props.data.length}
              setColumnWidth={(width) => {
                const columnWidths: number[] = [...this.state.columnWidths];
                columnWidths[columnIndex] = width;

                this.setState({ columnWidths }, () => {
                  resolve(undefined);
                });
              }}
            />
          );

          this.setState({
            columns: [...this.state.columns, col],
          });
        });
      }
    })();
  }

  render() {
    return (
      <div>
        <div>
          {this.props.columns.map((colName, idx) => {
            return (
              <div
                className={`inline-block${
                  (this.state.columnWidths[idx] ?? -1) < 0 ? ' hidden' : ''
                }`}
                style={{ width: this.state.columnWidths[idx] }}
                key={idx}
              >
                {colName}{' '}
              </div>
            );
          })}
        </div>
        <div className="flex border-t border-l border-b border-gray-400 w-fit">
          {this.state.columns}
        </div>
      </div>
    );
  }
}
