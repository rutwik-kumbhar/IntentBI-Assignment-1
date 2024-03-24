package com.intentbi.controllers;


import com.intentbi.payloads.ExcelFileUploadResponse;
import com.intentbi.services.ExcelFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/file/")
public class ExcelFileController {


    @Autowired
    private ExcelFileService excelFileService;



    @PostMapping("/upload")
    public ResponseEntity<ExcelFileUploadResponse> fileUpload(@RequestParam MultipartFile file){
        return  new ResponseEntity<ExcelFileUploadResponse>(excelFileService.readAndSaveRecords(file), HttpStatus.OK);
    }


}
