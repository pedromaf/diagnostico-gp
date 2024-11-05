import { PreviousHistory } from './previous-history.js';

export interface MedicalRecord {
  id?: number;
  name: string;
  birthdate: Date;
  gender?: string;
  address: string;
  phoneNumber: string;
  email?: string;
  consultationDate: Date;

  previousHistory?: PreviousHistory;
}