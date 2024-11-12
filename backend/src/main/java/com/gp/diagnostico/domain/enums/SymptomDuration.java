package com.gp.diagnostico.domain.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum SymptomDuration {
    ONE_TO_THREE_DAYS("1-3 days"),
    FOUR_TO_SEVEN_DAYS("4-7 days"),
    ONE_TO_TWO_WEEKS("1-2 weeks"),
    MORE_THAN_TWO_WEEKS("More than 2 weeks");

    private final String displayValue;

    SymptomDuration(String displayValue) {
        this.displayValue = displayValue;
    }

    @JsonValue
    public String getDisplayValue() {
        return displayValue;
    }

    @JsonCreator
    public static SymptomDuration forValue(String value) {
        for (SymptomDuration duration : SymptomDuration.values()) {
            if (duration.toString().equalsIgnoreCase(value)) {
                return duration;
            }
        }
        throw new IllegalArgumentException("Unknown enum value: " + value);
    }
}
