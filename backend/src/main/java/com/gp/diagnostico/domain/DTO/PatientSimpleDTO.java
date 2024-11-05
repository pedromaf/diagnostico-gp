package com.gp.diagnostico.domain.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class PatientSimpleDTO {
    private long id;

    private String fullName;

    private Date birthdate;

    private String email;

    private String phone;

    private String sex;
}
