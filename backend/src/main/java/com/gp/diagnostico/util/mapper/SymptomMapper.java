package com.gp.diagnostico.util.mapper;

import com.gp.diagnostico.domain.dto.SymptomDTO;
import com.gp.diagnostico.domain.entity.Symptom;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SymptomMapper {

    SymptomMapper INSTANCE = Mappers.getMapper(SymptomMapper.class);

    Symptom toEntity(SymptomDTO symptomDTO);
    SymptomDTO toDTO(Symptom symptom);
}