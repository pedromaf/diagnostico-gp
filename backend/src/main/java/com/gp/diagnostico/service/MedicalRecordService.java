package com.gp.diagnostico.service;

import com.gp.diagnostico.domain.dto.*;
import com.gp.diagnostico.domain.entity.LaboratoryAnalyses;
import com.gp.diagnostico.domain.entity.MedicalRecord;
import com.gp.diagnostico.domain.entity.PreviousHistory;
import com.gp.diagnostico.domain.entity.Symptomatology;
import com.gp.diagnostico.util.mapper.MedicalRecordMapper;
import com.gp.diagnostico.util.mapper.PreviousHistoryMapper;
import com.gp.diagnostico.util.mapper.LaboratoryAnalysesMapper;
import com.gp.diagnostico.repository.MedicalRecordRepository;
import com.gp.diagnostico.service.exception.MedicalRecordNotFoundException;
import com.gp.diagnostico.util.mapper.SymptomatologyMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


import java.util.Optional;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicalRecordMapper medicalRecordMapper;
    private final PreviousHistoryMapper previousHistoryMapper;
    private final LaboratoryAnalysesMapper laboratoryAnalysesMapper;
    private final SymptomatologyMapper symptomatologyMapper;
    private final WebClient webClient;

    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository,
                                MedicalRecordMapper medicalRecordMapper,
                                PreviousHistoryMapper previousHistoryMapper,
                                LaboratoryAnalysesMapper laboratoryAnalysesMapper,
                                SymptomatologyMapper symptomatologyMapper,
                                WebClient webClient) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.medicalRecordMapper = medicalRecordMapper;
        this.previousHistoryMapper = previousHistoryMapper;
        this.laboratoryAnalysesMapper = laboratoryAnalysesMapper;
        this.symptomatologyMapper = symptomatologyMapper;
        this.webClient = webClient;
    }

    public Iterable<MedicalRecord> findAll() {
        return medicalRecordRepository.findAll();
    }

    public MedicalRecord findById(Long id) {
        Optional<MedicalRecord> medicalRecordOptional = medicalRecordRepository.findById(id);

        if (medicalRecordOptional.isPresent()) {
            return medicalRecordOptional.get();
        }

        throw new MedicalRecordNotFoundException();
    }

    public MedicalRecord createMedicalRecord(MedicalRecordDTO medicalRecordDto) {
        MedicalRecord medicalRecord = medicalRecordMapper.toEntity(medicalRecordDto);

        medicalRecord.setPreviousHistory(null);

        return medicalRecordRepository.save(medicalRecord);
    }

    public MedicalRecord updatePreviousHistory(Long id, PreviousHistoryDTO previousHistoryDto) {
        MedicalRecord medicalRecord = findById(id);

        PreviousHistory previousHistory = previousHistoryMapper.toEntity(previousHistoryDto);
        previousHistory.setMedicalRecord(medicalRecord);

        medicalRecord.setPreviousHistory(previousHistory);

        return medicalRecordRepository.save(medicalRecord);
    }

    public MedicalRecord updateLaboratoryAnalyses(Long id, LaboratoryAnalysesDTO laboratoryAnalysesDTO) {
        MedicalRecord medicalRecord = findById(id);

        LaboratoryAnalyses laboratoryAnalyses = laboratoryAnalysesMapper.toEntity(laboratoryAnalysesDTO);
        laboratoryAnalyses.setMedicalRecord(medicalRecord);

        medicalRecord.setLaboratoryAnalyses(laboratoryAnalyses);

        return medicalRecordRepository.save(medicalRecord);
    }

    public void deleteMedicalRecord(Long id) {
        MedicalRecord medicalRecord = findById(id);
        medicalRecordRepository.delete(medicalRecord);
    }

    public SimplifiedMedicalRecordDTO findByIdSimplified(Long id) {
        MedicalRecord medicalRecord = findById(id);
        SimplifiedMedicalRecordDTO dto = new SimplifiedMedicalRecordDTO();

        dto.setId(medicalRecord.getId());
        dto.setName(medicalRecord.getName());
        dto.setBirthdate(medicalRecord.getBirthdate());
        dto.setGender(medicalRecord.getGender());
        dto.setAddress(medicalRecord.getAddress());
        dto.setEmail(medicalRecord.getEmail());
        dto.setPhoneNumber(medicalRecord.getPhoneNumber());
        dto.setConsultationDate(medicalRecord.getConsultationDate());

        return dto;
    }

    public MedicalRecord updateSymptomatology(Long id, SymptomatologyDTO symptomatologyDTO) {
        MedicalRecord medicalRecord = findById(id);

        Symptomatology symptomatology = symptomatologyMapper.toEntity(symptomatologyDTO);
        symptomatology.setMedicalRecord(medicalRecord);

        medicalRecord.setSymptomatology(symptomatology);

        return medicalRecordRepository.save(medicalRecord);
    }

    public DiagnosisDTO sendMedicalDataToIA(Long medicalRecordId ) {
        MedicalRecord medicalRecord = findById(medicalRecordId);
        DiagnosisDTO diagnosisDTO = new DiagnosisDTO();

        String externalApiUrl = "https://localhost:5000/api/ia_service";

        Mono<String> response = webClient.post()
                .uri(externalApiUrl)
                .header("Content-Type", "application/json")
                .bodyValue(medicalRecord)
                .retrieve()
                .bodyToMono(String.class);

        String responseBody = response.block();

        return diagnosisDTO;
    }
}
