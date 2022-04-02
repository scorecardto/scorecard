export default class SortableElement {
  sortInput: number | string | boolean;

  sortOutput: JSX.Element;

  constructor(sortInput: number | string | boolean, sortOutput: JSX.Element) {
    this.sortInput = sortInput;
    this.sortOutput = sortOutput;
  }
}
