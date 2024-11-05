package com.gp.diagnostico.util.mapper;

import com.gp.diagnostico.domain.dto.GeneralConditionsDTO;
import com.gp.diagnostico.domain.entity.GeneralConditions;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface GeneralConditionsMapper {

    GeneralConditionsMapper INSTANCE = Mappers.getMapper(GeneralConditionsMapper.class);

    GeneralConditions toEntity(GeneralConditionsDTO dto);

    GeneralConditionsDTO toDTO(GeneralConditions entity);
}
