package com.intentbi.payloads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ExcelSheet {

    private  String sheetName;
    private  String errorMessage;

}
