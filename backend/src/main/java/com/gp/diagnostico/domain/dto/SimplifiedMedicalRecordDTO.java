package com.gp.diagnostico.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SimplifiedMedicalRecordDTO {
    private long id;
    private String name;
    private Date birthdate;
    private String gender;
    private String address;
    private String phoneNumber;
    private String email;
    private Date consultationDate;
}
