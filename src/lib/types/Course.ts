export type Course = {
  hash: string;
  name: string;
  cellKey: string;
  weighted: boolean;
  credit: number;
  grades: (string | number)[];
  otherFields: {
    key: string;
    value: string;
  }[];
};
