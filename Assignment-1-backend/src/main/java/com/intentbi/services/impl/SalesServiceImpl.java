package com.intentbi.services.impl;

import com.intentbi.entities.SalesRecord;
import com.intentbi.exceptions.ResourcesNotFoundException;
import com.intentbi.payloads.SalesRecordsResponse;
import com.intentbi.repositories.SalesRecordRepository;
import com.intentbi.services.SalesRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SalesServiceImpl  implements SalesRecordService {


    @Autowired
    private SalesRecordRepository salesRecordRepository;


    @Override
    public SalesRecord createSalesRecord(SalesRecord salesRecord) {
        return salesRecordRepository.save(salesRecord);
    }

    @Override
    public SalesRecordsResponse getSalesRecords(int pageNumber, int pageSize) {
        System.out.println("Page Number " + pageNumber);
        System.out.println("Page size  " + pageSize);
        Pageable pageable =  PageRequest.of(pageNumber - 1,pageSize);

        Page<SalesRecord> page =  salesRecordRepository.findAll(pageable);

        return   SalesRecordsResponse.builder()
                .total(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .perPage(page.getSize())
                .currentPage(page.getNumber())
                .nextPage(page.hasNext())
                .prevPage(page.hasPrevious())
                .salesRecords(page.getContent()).build();
    }

    @Override
    public SalesRecord getSalesRecordById(long salesRecordId) throws ResourcesNotFoundException {
        return  salesRecordRepository.findById(salesRecordId).orElseThrow(()-> new ResourcesNotFoundException("Sale Record Not Found By Given Id " + salesRecordId));

    }

    @Override
    public SalesRecord updateSalesRecordById(long salesRecordId, SalesRecord salesRecord) throws ResourcesNotFoundException {
       SalesRecord existingSaleRecord =   this.getSalesRecordById(salesRecordId);
        existingSaleRecord.setMarket(salesRecord.getMarket());
        existingSaleRecord.setCountry(salesRecord.getCountry());
        existingSaleRecord.setProduct(salesRecord.getProduct());
        existingSaleRecord.setDiscountBand(salesRecord.getDiscountBand());
        existingSaleRecord.setUnitsSold(salesRecord.getUnitsSold());
        existingSaleRecord.setManufacturingPrice(salesRecord.getManufacturingPrice());
        existingSaleRecord.setSalePrice(salesRecord.getSalePrice());
        existingSaleRecord.setGrossSales(salesRecord.getGrossSales());
        existingSaleRecord.setDiscounts(salesRecord.getDiscounts());
        existingSaleRecord.setSales(salesRecord.getSales());
        existingSaleRecord.setCogs(salesRecord.getCogs());
        existingSaleRecord.setProfit(salesRecord.getProfit());
        existingSaleRecord.setDate(salesRecord.getDate());
        existingSaleRecord.setMonthNumber(salesRecord.getMonthNumber());
        existingSaleRecord.setMonthName(salesRecord.getMonthName());
        existingSaleRecord.setYear(salesRecord.getYear());
        return  salesRecordRepository.save(existingSaleRecord);
    }

    @Override
    public SalesRecord deleteSalesRecord(long salesRecordId) throws ResourcesNotFoundException {
        SalesRecord salesRecord =  this.getSalesRecordById(salesRecordId);
        salesRecordRepository.delete(salesRecord);
        return salesRecord;
    }
}
