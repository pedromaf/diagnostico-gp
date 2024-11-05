package com.gp.diagnostico.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "family_history")
public class FamilyHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "family_history_sequence")
    @SequenceGenerator(name = "family_history_sequence", sequenceName = "family_history_id_seq", allocationSize = 1)
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

    @OneToOne(mappedBy = "familyHistory")
    private PreviousHistory previousHistory;
}
