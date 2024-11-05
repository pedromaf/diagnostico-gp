package com.gp.diagnostico.util.mapper;

import com.gp.diagnostico.domain.dto.PreviousHistoryDTO;
import com.gp.diagnostico.domain.entity.PreviousHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {
        GeneralConditionsMapper.class,
        PatientAllergiesMapper.class,
        ClinicalHistoryMapper.class,
        FamilyHistoryMapper.class
})
public interface PreviousHistoryMapper {

    PreviousHistoryMapper INSTANCE = Mappers.getMapper(PreviousHistoryMapper.class);

    @Mapping(target = "medicalRecord", ignore = true)
    PreviousHistory toEntity(PreviousHistoryDTO dto);

    PreviousHistoryDTO toDTO(PreviousHistory entity);
}

