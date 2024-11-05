package com.gp.diagnostico.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientAllergiesDTO {
    private boolean milk;
    private boolean egg;
    private boolean seafood;
    private boolean peanutsNuts;
    private boolean aspirin;
    private boolean penicillin;
    private boolean nsaids;
    private boolean mites;
    private boolean dust;
    private boolean pollen;
    private boolean bees;
    private boolean catsDogs;
}
