package com.gp.diagnostico.repository;

import com.gp.diagnostico.domain.Entity.Patient;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PatientRepository extends CrudRepository<Patient, Long> {
    Optional<Patient> findByCpf(String cpf);
}
