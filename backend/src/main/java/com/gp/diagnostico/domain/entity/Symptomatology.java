package com.gp.diagnostico.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "symptomatology")
public class Symptomatology {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "symptomatology_sequence")
    @SequenceGenerator(name = "symptomatology_sequence", sequenceName = "symptomatology_id_seq", allocationSize = 1)
    private Long id;

    @ElementCollection
    @CollectionTable(name = "symptoms", joinColumns = @JoinColumn(name = "symptomatology_id"))
    private List<Symptom> symptoms;

    @OneToOne(mappedBy = "symptomatology")
    @JsonIgnore
    private MedicalRecord medicalRecord;
}