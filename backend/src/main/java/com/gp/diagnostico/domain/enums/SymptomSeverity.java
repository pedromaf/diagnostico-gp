package com.gp.diagnostico.domain.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum SymptomSeverity {
    LIGHT("Light"),
    MODERATE("Moderate"),
    SEVERE("Severe");

    private final String displayValue;

    SymptomSeverity(String displayValue) {
        this.displayValue = displayValue;
    }

    @JsonValue
    public String getDisplayValue() {
        return displayValue;
    }

    @JsonCreator
    public static SymptomSeverity forValue(String value) {
        for (SymptomSeverity severity : SymptomSeverity.values()) {
            if (severity.toString().equalsIgnoreCase(value)) {
                return severity;
            }
        }
        throw new IllegalArgumentException("Unknown enum value: " + value);
    }
}