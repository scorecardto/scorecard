import { DecryptedRecord, EncryptedRecord } from './Record';

export type Block = {
  nextKey?: string;
  publicKey: string;
  rangeStart: number;
  rangeEnd: number;
  records: (EncryptedRecord | DecryptedRecord)[];
};
