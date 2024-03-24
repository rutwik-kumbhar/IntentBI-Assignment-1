package com.intentbi.services;


import com.intentbi.entities.SalesRecord;
import com.intentbi.exceptions.ResourcesNotFoundException;
import com.intentbi.payloads.SalesRecordsResponse;

import java.util.List;

public interface SalesRecordService {

    /**
     * This method for create new sales record
     * @param salesRecord
     * @return newly created sales record
     */
    public SalesRecord createSalesRecord(SalesRecord salesRecord);



    /**
     * This method for get sales records  page wise
     * @param pageNumber
     * @param size
     * @return SalesRecordsResponse Object
     */
    public SalesRecordsResponse getSalesRecords(int pageNumber , int size);


    /**
     * This method get sales record by sales record id
     * @param salesRecordId
     * @return existing sales record;
     * @throws ResourcesNotFoundException
     */
    public SalesRecord getSalesRecordById(long salesRecordId) throws ResourcesNotFoundException;


    /**
     * This method for update existing sales record
     * @param salesRecordId
     * @param salesRecord
     * @return updated sales record
     * @throws ResourcesNotFoundException
     */
    public  SalesRecord updateSalesRecordById(long salesRecordId , SalesRecord salesRecord) throws ResourcesNotFoundException;



    public  SalesRecord deleteSalesRecord(long salesRecordId) throws  ResourcesNotFoundException;


}
