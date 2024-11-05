package com.gp.diagnostico.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "previous_history")
public class PreviousHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "previous_history_sequence")
    @SequenceGenerator(name = "previous_history_sequence", sequenceName = "previous_history_id_seq", allocationSize = 1)
    private Long id;

    @OneToOne(mappedBy = "previousHistory")
    @JsonIgnore
    private MedicalRecord medicalRecord;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "general_conditions_id")
    private GeneralConditions generalConditions;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_allergies_id")
    private PatientAllergies patientAllergies;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "clinical_history_id")
    private ClinicalHistory clinicalHistory;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "family_history_id")
    private FamilyHistory familyHistory;
}
