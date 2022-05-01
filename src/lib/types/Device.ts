export type Device = {
  interalName: string;
  customName: string;
  deviceType:
    | 'IPHONE'
    | 'ANDROID'
    | 'SAFARI'
    | 'OPERA'
    | 'FIREFOX'
    | 'CHROME'
    | 'EDGE'
    | 'BRAVE'
    | 'OTHER_BROWSER'
    | 'UFO'; // we love being quirky like tha
};
