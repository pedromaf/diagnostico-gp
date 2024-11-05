package com.gp.diagnostico.util.mapper;

import com.gp.diagnostico.domain.dto.FamilyHistoryDTO;
import com.gp.diagnostico.domain.entity.FamilyHistory;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FamilyHistoryMapper {

    FamilyHistoryMapper INSTANCE = Mappers.getMapper(FamilyHistoryMapper.class);

    FamilyHistory toEntity(FamilyHistoryDTO dto);

    FamilyHistoryDTO toDTO(FamilyHistory entity);
}
