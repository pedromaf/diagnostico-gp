package com.gp.diagnostico.service.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CpfAlreadyRegisteredException extends RuntimeException {
    public CpfAlreadyRegisteredException() { super("This CPF is already registered."); }
}
