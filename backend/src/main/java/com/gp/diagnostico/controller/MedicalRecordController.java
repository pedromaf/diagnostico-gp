package com.gp.diagnostico.controller;

import com.gp.diagnostico.domain.dto.LaboratoryAnalysesDTO;
import com.gp.diagnostico.domain.dto.MedicalRecordDTO;
import com.gp.diagnostico.domain.dto.PreviousHistoryDTO;
import com.gp.diagnostico.domain.entity.MedicalRecord;
import com.gp.diagnostico.service.MedicalRecordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medicalRecord")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @GetMapping("/")
    public ResponseEntity<Iterable<MedicalRecord>> findAll() {
        return ResponseEntity.ok(medicalRecordService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> findById(@PathVariable Long id) {
        return ResponseEntity.ok(medicalRecordService.findById(id));
    }

    @PostMapping("/")
    public ResponseEntity<MedicalRecord> createMedicalRecord(@RequestBody MedicalRecordDTO medicalRecordDto) {
        MedicalRecord createdMedicalRecord = medicalRecordService.createMedicalRecord(medicalRecordDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMedicalRecord);
    }

    @PutMapping("/{id}/previousHistory")
    public ResponseEntity<MedicalRecord> updatePreviousHistory(@PathVariable Long id, @RequestBody PreviousHistoryDTO previousHistoryDto) {
        MedicalRecord updatedMedicalRecord = medicalRecordService.updatePreviousHistory(id, previousHistoryDto);
        return ResponseEntity.ok(updatedMedicalRecord);
    }

    @PutMapping("/{id}/laboratoryAnalyses")
    public ResponseEntity<MedicalRecord> updateLaboratoryAnalyses(@PathVariable Long id, @RequestBody LaboratoryAnalysesDTO laboratoryAnalysesDto) {
        MedicalRecord updatedMedicalRecord = medicalRecordService.updateLaboratoryAnalyses(id, laboratoryAnalysesDto);

        return ResponseEntity.ok(updatedMedicalRecord);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalRecord(@PathVariable Long id) {
        medicalRecordService.deleteMedicalRecord(id);
        return ResponseEntity.noContent().build();
    }
}
