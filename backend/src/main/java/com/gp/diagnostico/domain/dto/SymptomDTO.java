package com.gp.diagnostico.domain.dto;

import com.gp.diagnostico.domain.enums.SymptomDuration;
import com.gp.diagnostico.domain.enums.SymptomSeverity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SymptomDTO {

    private String name;
    @Enumerated(EnumType.STRING)
    private SymptomDuration duration;
    @Enumerated(EnumType.STRING)
    private SymptomSeverity severity;
}
