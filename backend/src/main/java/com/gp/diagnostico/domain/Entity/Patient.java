package com.gp.diagnostico.domain.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @SequenceGenerator(name = "patient", sequenceName = "patient_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "patient_sequence")
    private long id;

    @NonNull
    private String fullName;

    @NonNull
    private String motherName;

    private String fatherName;

    @NonNull
    private Date birthdate;

    private String email;

    @NonNull
    private String phone;

    @NonNull
    private String sex;

    @NonNull
    private String address;

    @NonNull
    private String city;

    @NonNull
    private String state;

    @NonNull
    private String cep;

    @NonNull
    private String cpf;

}
