package com.gp.diagnostico.util.mapper;

import com.gp.diagnostico.domain.entity.Symptomatology;
import com.gp.diagnostico.domain.dto.SymptomatologyDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = { SymptomMapper.class })
public interface SymptomatologyMapper {

    SymptomatologyMapper INSTANCE = Mappers.getMapper(SymptomatologyMapper.class);

    @Mapping(target = "medicalRecord", ignore = true)
    Symptomatology toEntity(SymptomatologyDTO symptomatologyDTO);

    SymptomatologyDTO toDTO(Symptomatology symptomatology);
}