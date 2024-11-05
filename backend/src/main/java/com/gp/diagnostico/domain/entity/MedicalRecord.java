package com.gp.diagnostico.domain.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "medical_record")
public class MedicalRecord {
    @Id
    @SequenceGenerator(name = "medical_record", sequenceName = "medical_record_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "medical_record_sequence")
    private long id;

    @NonNull
    private String name;

    @NonNull
    private Date birthdate;

    private String gender;

    @NonNull
    private String address;

    @NonNull
    private String phoneNumber;

    private String email;

    @NonNull
    private Date consultationDate;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "previous_history_id")
    @JsonManagedReference
    private PreviousHistory previousHistory;
}
