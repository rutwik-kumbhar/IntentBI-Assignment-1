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


    private  final Map<String,String> invalidSheets = new HashMap<>();
    private  final Map<String,String> validSheets = new HashMap<>();
    private  long totalUploadedRecords;

}
