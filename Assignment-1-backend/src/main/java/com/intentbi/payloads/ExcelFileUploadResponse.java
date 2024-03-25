package com.intentbi.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExcelFileUploadResponse {

    private final List<ExcelSheet> invalidSheet = new ArrayList<>();
    private final List<ExcelSheet> validSheet = new ArrayList<>();
    private  long totalUploadedRecords;

}
