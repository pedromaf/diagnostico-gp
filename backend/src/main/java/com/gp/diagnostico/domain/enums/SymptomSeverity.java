package com.gp.diagnostico.domain.enums;

public enum SymptomSeverity {
    LIGHT("Light"),
    MODERATE("Moderate"),
    SEVERE("Severe");

    private final String displayValue;

    SymptomSeverity(String displayValue) {
        this.displayValue = displayValue;
    }

    public String getDisplayValue() {
        return displayValue;
    }
}