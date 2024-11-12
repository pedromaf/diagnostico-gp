package com.gp.diagnostico.domain.entity;

import com.gp.diagnostico.domain.enums.SymptomSeverity;
import com.gp.diagnostico.domain.enums.SymptomDuration;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Symptom {

    private String name;

    @Enumerated(EnumType.STRING)
    private SymptomDuration duration;

    @Enumerated(EnumType.STRING)
    private SymptomSeverity severity;
}