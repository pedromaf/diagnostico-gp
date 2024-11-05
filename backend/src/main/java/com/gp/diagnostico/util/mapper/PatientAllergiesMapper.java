package com.gp.diagnostico.util.mapper;

import com.gp.diagnostico.domain.dto.PatientAllergiesDTO;
import com.gp.diagnostico.domain.entity.PatientAllergies;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PatientAllergiesMapper {

    PatientAllergiesMapper INSTANCE = Mappers.getMapper(PatientAllergiesMapper.class);

    PatientAllergies toEntity(PatientAllergiesDTO dto);

    PatientAllergiesDTO toDTO(PatientAllergies entity);
}

