package com.gp.diagnostico.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "general_conditions")
public class GeneralConditions {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "general_conditions_sequence")
    @SequenceGenerator(name = "general_conditions_sequence", sequenceName = "general_conditions_id_seq", allocationSize = 1)
    private Long id;

    private boolean smoker;
    private boolean alcohol;

    @OneToOne(mappedBy = "generalConditions")
    @JsonIgnore
    private PreviousHistory previousHistory;
}

