package com.gp.diagnostico.util.mapper;

import com.gp.diagnostico.domain.dto.LaboratoryAnalysesDTO;
import com.gp.diagnostico.domain.entity.LaboratoryAnalyses;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LaboratoryAnalysesMapper {

    LaboratoryAnalysesMapper INSTANCE = Mappers.getMapper(LaboratoryAnalysesMapper.class);

    LaboratoryAnalyses toEntity(LaboratoryAnalysesDTO dto);

    LaboratoryAnalysesDTO toDTO(LaboratoryAnalyses entity);
}