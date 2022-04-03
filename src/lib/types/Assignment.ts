export type Assignment = {
  name: string;
  grade: string | number;
  weight: number;
  dropped?: boolean;
  otherFields: {
    key: string;
    value: string;
  }[];
};
