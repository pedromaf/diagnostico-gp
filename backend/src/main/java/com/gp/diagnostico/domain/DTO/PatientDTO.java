package com.gp.diagnostico.domain.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class PatientDTO {
    private long id;

    private String fullName;

    private String motherName;

    private String fatherName;

    private Date birthdate;

    private String email;

    private String phone;

    private String sex;

    private String address;

    private String city;

    private String state;

    private String cep;

    private String cpf;
}
