package com.gp.diagnostico.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SymptomatologyDTO {

    private Long id;
    private List<SymptomDTO> symptoms;
}
