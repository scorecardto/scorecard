const transpose = (arr: any): any => {
  return (arr[0] ?? []).map((_: any, colIndex: number) =>
    arr.map((row: any) => row[colIndex])
  );
};

export { transpose };
