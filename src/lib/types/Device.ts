import { OperatingSystem } from 'detect-browser';

export type Device = {
  interalName: string;
  customName?: string;
  browser:
    | 'IOS'
    | 'ANDROID'
    | 'SAFARI'
    | 'OPERA'
    | 'FIREFOX'
    | 'CHROME'
    | 'EDGE'
    | 'BRAVE'
    | 'OTHER_BROWSER'
    | 'UFO'; // we love being quirky like that
  os: OperatingSystem | NodeJS.Platform | 'UFO';
  version: string;
};
