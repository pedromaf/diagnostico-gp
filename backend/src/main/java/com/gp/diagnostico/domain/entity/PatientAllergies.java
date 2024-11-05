package com.gp.diagnostico.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "patient_allergies")
public class PatientAllergies {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "patient_allergies_sequence")
    @SequenceGenerator(name = "patient_allergies_sequence", sequenceName = "patient_allergies_id_seq", allocationSize = 1)
    private Long id;

    private boolean milk;
    private boolean egg;
    private boolean seafood;
    private boolean peanutsNuts;
    private boolean aspirin;
    private boolean penicillin;
    private boolean nsaids;
    private boolean mites;
    private boolean dust;
    private boolean pollen;
    private boolean bees;
    private boolean catsDogs;

    @OneToOne(mappedBy = "patientAllergies")
    @JsonIgnore
    private PreviousHistory previousHistory;
}
