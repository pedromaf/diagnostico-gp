package com.gp.diagnostico.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class MedicalRecordDTO {
    private long id;
    private String name;
    private Date birthdate;
    private String gender;
    private String address;
    private String phoneNumber;
    private String email;
    private Date consultationDate;

    private PreviousHistoryDTO previousHistory;
}
