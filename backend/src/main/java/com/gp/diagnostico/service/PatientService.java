package com.gp.diagnostico.service;

import com.gp.diagnostico.domain.DTO.PatientDTO;
import com.gp.diagnostico.domain.DTO.PatientSimpleDTO;
import com.gp.diagnostico.domain.Entity.Patient;
import com.gp.diagnostico.repository.PatientRepository;
import com.gp.diagnostico.service.Exception.CpfAlreadyRegisteredException;
import com.gp.diagnostico.service.Exception.PatientNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    private PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Iterable<Patient> findAll() {
        return patientRepository.findAll();
    }

    public Patient findById(Long id) {
        Optional<Patient> patientOptional = patientRepository.findById(id);

        if (patientOptional.isPresent()) {
            return patientOptional.get();
        }

        throw new PatientNotFoundException();
    }

    public void CreatePatient(PatientDTO patientDto) {
        Optional<Patient> patientOptional = patientRepository.findByCpf(patientDto.getCpf());

        if (patientOptional.isPresent()) {
            throw new CpfAlreadyRegisteredException();
        }

        Patient patient = new Patient();

        patient.setFullName(patientDto.getFullName());
        patient.setEmail(patientDto.getEmail());
        patient.setPhone(patientDto.getPhone());
        patient.setAddress(patientDto.getAddress());
        patient.setBirthdate(patientDto.getBirthdate());
        patient.setMotherName(patientDto.getMotherName());
        patient.setFatherName(patientDto.getFatherName());
        patient.setSex(patientDto.getSex());
        patient.setCity(patientDto.getCity());
        patient.setState(patientDto.getState());
        patient.setCep(patientDto.getCep());
        patient.setCpf(patientDto.getCpf());

        patientRepository.save(patient);
    }

    public void updatePatient(PatientDTO patientDto) {
        Patient patient = findById(patientDto.getId());

        Optional<Patient> patientOptional = patientRepository.findByCpf(patientDto.getCpf());

        if (patientOptional.isPresent() && patientOptional.get().getId() != patient.getId()) {
            throw new CpfAlreadyRegisteredException();
        }

        patient.setFullName(patientDto.getFullName());
        patient.setEmail(patientDto.getEmail());
        patient.setPhone(patientDto.getPhone());
        patient.setAddress(patientDto.getAddress());
        patient.setBirthdate(patientDto.getBirthdate());
        patient.setMotherName(patientDto.getMotherName());
        patient.setFatherName(patientDto.getFatherName());
        patient.setSex(patientDto.getSex());
        patient.setCity(patientDto.getCity());
        patient.setState(patientDto.getState());
        patient.setCep(patientDto.getCep());
        patient.setCpf(patientDto.getCpf());

        patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        Patient patient = findById(id);

        patientRepository.delete(patient);
    }

}
