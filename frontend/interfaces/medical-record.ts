import { LaboratoryAnalyses } from './laboratory-analyses.js';
import { PreviousHistory } from './previous-history.js';
import { Symptomatology } from './symptomatology.js';

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
  laboratoryAnalyses?: LaboratoryAnalyses;
  symptomatology?: Symptomatology;
}