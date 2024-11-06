package com.gp.diagnostico.domain.enums;

public enum SymptomDuration {
    ONE_TO_THREE_DAYS("1-3 days"),
    FOUR_TO_SEVEN_DAYS("4-7 days"),
    ONE_TO_TWO_WEEKS("1-2 weeks"),
    MORE_THAN_TWO_WEEKS("More than 2 weeks");

    private final String displayValue;

    SymptomDuration(String displayValue) {
        this.displayValue = displayValue;
    }

    public String getDisplayValue() {
        return displayValue;
    }
}
