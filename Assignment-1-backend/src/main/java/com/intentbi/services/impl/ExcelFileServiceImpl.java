package com.intentbi.services.impl;

import com.intentbi.customeValidation.ExcelSheetValidation;
import com.intentbi.entities.SalesRecord;
import com.intentbi.exceptions.FileException;
import com.intentbi.payloads.ExcelFileUploadResponse;
import com.intentbi.payloads.ExcelSheet;
import com.intentbi.repositories.SalesRecordRepository;
import com.intentbi.services.ExcelFileService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


@Service
public class ExcelFileServiceImpl implements ExcelFileService {
    @Autowired
   private SalesRecordRepository salesRecordRepository;

    @Override
    public ExcelFileUploadResponse readAndSaveRecords(MultipartFile excelFile) {

        List<SalesRecord>  salesRecords = new ArrayList<>();
        ExcelFileUploadResponse excelFileUploadResponse = new ExcelFileUploadResponse();

        try {
            if (excelFile.isEmpty()) {
             throw new FileException("Please Upload Excel File");
            }

            // Check file extension
            String fileName = excelFile.getOriginalFilename();
            if (!StringUtils.hasText(fileName) || !fileName.toLowerCase().endsWith(".xlsx")) {
                    throw new FileException("You Can Upload Only Excel File With Extension .xlsx");
            }

            InputStream inputStream = excelFile.getInputStream();
            Workbook workbook = new XSSFWorkbook(inputStream);

            for (int i = 0; i < workbook.getNumberOfSheets(); i++) {

                Sheet sheet = workbook.getSheetAt(i);

//               boolean isSheetValidated =   ExcelSheetValidation.validateSheet(sheet);
//               System.out.println(sheet.getSheetName() + "==="  + isSheetValidated);

                if (ExcelSheetValidation.validateSheet(sheet)){
                    for (Row row : sheet) {
                        if (row.getRowNum() == 0) continue;
                        SalesRecord salesRecord = ExcelSheetValidation.rowValidation(row);
                        salesRecords.add(salesRecord);
                    }
                    excelFileUploadResponse.getValidSheet().add(ExcelSheet.builder().sheetName(sheet.getSheetName()).errorMessage("Sheet Uploaded Successfully...!").build());
                }else{
                    excelFileUploadResponse.getInvalidSheet().add(ExcelSheet.builder().sheetName(sheet.getSheetName()).errorMessage("All Column Should Be Present In The sheet").build());
                }
            }

            excelFileUploadResponse.setTotalUploadedRecords(salesRecords.size());
            salesRecordRepository.saveAll(salesRecords);
         return  excelFileUploadResponse;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }


    }


}
