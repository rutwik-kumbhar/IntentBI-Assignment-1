package com.intentbi.controllers;


import com.intentbi.entities.SalesRecord;
import com.intentbi.payloads.SalesRecordsResponse;
import com.intentbi.services.SalesRecordService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/sales/records")
public class SalesRecordController {
    @Autowired
     private SalesRecordService salesRecordService;


    @PostMapping()
    public ResponseEntity<SalesRecord> addSaleRecord(@Valid @RequestBody SalesRecord salesRecord){
     return  new ResponseEntity<>(salesRecordService.createSalesRecord(salesRecord), HttpStatus.CREATED);
    }


    @GetMapping("/{pageNumber}/{pageSize}")
    public ResponseEntity<SalesRecordsResponse> getSaleRecords(@PathVariable int pageNumber  ,@PathVariable int pageSize){
        return  new ResponseEntity<SalesRecordsResponse>(salesRecordService.getSalesRecords(pageNumber ,pageSize), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalesRecord> updateSaleRecords(@PathVariable(name= "id") long salesRecordId   ,@RequestBody SalesRecord salesRecord){
        return  new ResponseEntity<SalesRecord>(salesRecordService.updateSalesRecordById(salesRecordId ,salesRecord), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalesRecord> getSaleRecords(@PathVariable(name= "id") long salesRecordId){
        return  new ResponseEntity<SalesRecord>(salesRecordService.getSalesRecordById(salesRecordId), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SalesRecord> deleteSaleRecords(@PathVariable(name= "id") long salesRecordId ){
        return  new ResponseEntity<SalesRecord>(salesRecordService.deleteSalesRecord(salesRecordId), HttpStatus.OK);
    }

}
