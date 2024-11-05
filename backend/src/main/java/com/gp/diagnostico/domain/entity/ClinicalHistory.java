package com.gp.diagnostico.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "clinical_history")
public class ClinicalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "clinical_history_sequence")
    @SequenceGenerator(name = "clinical_history_sequence", sequenceName = "clinical_history_id_seq", allocationSize = 1)
    private Long id;

    private boolean diabetes;
    private boolean hypertension;
    private boolean asthma;
    private boolean hypothyroidism;
    private boolean arthritis;
    private boolean cancer;
    private boolean depression;
    private boolean kidneyDisease;
    private boolean hepatitis;
    private boolean tuberculosis;
    private boolean anemia;
    private boolean heartFailure;
    private boolean lungDisease;
    private boolean alzheimer;
    private boolean stroke;
    private boolean epilepsy;

    @OneToOne(mappedBy = "clinicalHistory")
    @JsonIgnore
    private PreviousHistory previousHistory;
}
