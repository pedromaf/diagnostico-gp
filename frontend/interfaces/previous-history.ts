import { GeneralConditions } from './general-conditions.js';
import { PatientAllergies } from './patient-allergies.js';
import { ClinicalHistory } from './clinical-history.js';
import { FamilyHistory } from './family-history.js';

export interface PreviousHistory {
  id?: number;
  generalConditions?: GeneralConditions;
  patientAllergies?: PatientAllergies;
  clinicalHistory?: ClinicalHistory;
  familyHistory?: FamilyHistory;
}
