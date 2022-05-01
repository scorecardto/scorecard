import { Block } from './Block';
import { Device } from './Device';
import { Settings } from './Settings';

export type SyncedAppData = {
  blocks: Block[];
  settings: Settings;
  devices: Device[];
};
