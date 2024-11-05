package com.gp.diagnostico.util.mapper;

import com.gp.diagnostico.domain.dto.MedicalRecordDTO;
import com.gp.diagnostico.domain.entity.MedicalRecord;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {PreviousHistoryMapper.class})
public interface MedicalRecordMapper {

    MedicalRecordMapper INSTANCE = Mappers.getMapper(MedicalRecordMapper.class);

    MedicalRecord toEntity(MedicalRecordDTO dto);

    MedicalRecordDTO toDTO(MedicalRecord entity);
}
