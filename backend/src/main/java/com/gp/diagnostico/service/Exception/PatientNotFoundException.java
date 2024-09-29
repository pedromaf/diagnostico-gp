package com.gp.diagnostico.service.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PatientNotFoundException extends RuntimeException {
    public PatientNotFoundException() { super("Patient not found."); }
}
