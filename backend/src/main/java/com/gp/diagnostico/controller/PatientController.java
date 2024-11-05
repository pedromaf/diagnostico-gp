package com.gp.diagnostico.controller;

import com.gp.diagnostico.domain.DTO.PatientDTO;
import com.gp.diagnostico.domain.Entity.Patient;
import com.gp.diagnostico.service.PatientService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Transactional
@RequestMapping("/api/patient")
public class PatientController {

    private PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping()
    public ResponseEntity<Iterable<Patient>> findAll() {
        return ResponseEntity.ok(patientService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> findById(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.findById(id));
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public void createPatient(@RequestBody PatientDTO patientDto) {
        patientService.CreatePatient(patientDto);
    }

    @PutMapping()
    @ResponseStatus(HttpStatus.OK)
    public void updatePatient(@RequestBody PatientDTO patientDto) {
        patientService.updatePatient(patientDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }
}
