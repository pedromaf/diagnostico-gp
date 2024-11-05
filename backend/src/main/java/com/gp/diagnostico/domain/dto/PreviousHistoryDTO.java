package com.gp.diagnostico.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PreviousHistoryDTO {
    private GeneralConditionsDTO generalConditions;
    private PatientAllergiesDTO patientAllergies;
    private ClinicalHistoryDTO clinicalHistory;
    private FamilyHistoryDTO familyHistory;
}
