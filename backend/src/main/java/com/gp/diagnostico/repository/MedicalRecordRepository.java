package com.gp.diagnostico.repository;

import com.gp.diagnostico.domain.entity.MedicalRecord;
import org.springframework.data.repository.CrudRepository;

public interface MedicalRecordRepository extends CrudRepository<MedicalRecord, Long> {

}
