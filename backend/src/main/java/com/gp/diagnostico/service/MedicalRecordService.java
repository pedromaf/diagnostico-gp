package com.gp.diagnostico.service;

import com.gp.diagnostico.domain.dto.MedicalRecordDTO;
import com.gp.diagnostico.domain.dto.PreviousHistoryDTO;
import com.gp.diagnostico.domain.entity.MedicalRecord;
import com.gp.diagnostico.domain.entity.PreviousHistory;
import com.gp.diagnostico.util.mapper.MedicalRecordMapper;
import com.gp.diagnostico.util.mapper.PreviousHistoryMapper;
import com.gp.diagnostico.repository.MedicalRecordRepository;
import com.gp.diagnostico.service.exception.MedicalRecordNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicalRecordMapper medicalRecordMapper;
    private final PreviousHistoryMapper previousHistoryMapper;

    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository,
                                MedicalRecordMapper medicalRecordMapper,
                                PreviousHistoryMapper previousHistoryMapper) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.medicalRecordMapper = medicalRecordMapper;
        this.previousHistoryMapper = previousHistoryMapper;
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

    public void deleteMedicalRecord(Long id) {
        MedicalRecord medicalRecord = findById(id);
        medicalRecordRepository.delete(medicalRecord);
    }
}
