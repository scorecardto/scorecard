export interface ConfirmAlertOutline {
  title: JSX.Element | string;
  content: JSX.Element | string;
  buttons: {
    text: string;
    colored: boolean;
    callback(e: MouseEvent): void;
  }[];
}

export interface ConfirmAlertData extends ConfirmAlertOutline {
  close(): void;
}
