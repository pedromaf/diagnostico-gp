package com.gp.diagnostico.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "laboratory_analyses")
public class LaboratoryAnalyses {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "laboratory_analyses_sequence")
    @SequenceGenerator(name = "laboratory_analyses_sequence", sequenceName = "laboratory_analyses_id_seq", allocationSize = 1)
    private Long id;

    @OneToOne(mappedBy = "laboratoryAnalyses")
    @JsonIgnore
    private MedicalRecord medicalRecord;

    private double albumin;
    private double alkalinePhosphatase;
    private double alanineTransaminase;
    private double aspartateTransaminase;
    private double bilirubin;
    private double cholinesterase;
    private double cholesterol;
    private double creatinine;
    private double gammaGlutamylTransferase;
    private double totalProtein;
}
