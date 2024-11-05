package com.gp.diagnostico.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MedicalRecordNotFoundException extends RuntimeException {
    public MedicalRecordNotFoundException() { super("Medical record not found."); }
}
