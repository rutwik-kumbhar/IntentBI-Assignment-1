package com.intentbi.services;

import com.intentbi.payloads.ExcelFileUploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ExcelFileService {

    public ExcelFileUploadResponse readAndSaveRecords(MultipartFile excelFile);
}
