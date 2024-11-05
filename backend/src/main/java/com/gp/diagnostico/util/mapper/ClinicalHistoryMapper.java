package com.gp.diagnostico.util.mapper;

import com.gp.diagnostico.domain.dto.ClinicalHistoryDTO;
import com.gp.diagnostico.domain.entity.ClinicalHistory;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ClinicalHistoryMapper {

    ClinicalHistoryMapper INSTANCE = Mappers.getMapper(ClinicalHistoryMapper.class);

    ClinicalHistory toEntity(ClinicalHistoryDTO dto);

    ClinicalHistoryDTO toDTO(ClinicalHistory entity);
}
