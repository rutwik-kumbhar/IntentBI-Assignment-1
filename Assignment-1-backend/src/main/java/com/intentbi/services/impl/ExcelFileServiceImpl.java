package com.intentbi.services.impl;

import com.intentbi.CustomeValidation.ExcelSheetValidation;
import com.intentbi.entities.SalesRecord;
import com.intentbi.payloads.ExcelFileUploadResponse;
import com.intentbi.repositories.SalesRecordRepository;
import com.intentbi.services.ExcelFileService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
                    excelFileUploadResponse.getValidSheets().put(sheet.getSheetName(),"Sheet Uploaded Successfully...!");
                }else{
                    excelFileUploadResponse.getInvalidSheets().put(sheet.getSheetName(),"All Column Should Be Present In The sheet");
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
