package com.gp.diagnostico.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiagnosisDTO {
    private boolean healthy;
    private boolean hepatitisC;
    private boolean hepaticFibrosis;
    private boolean hepaticCirrhosis;
}
