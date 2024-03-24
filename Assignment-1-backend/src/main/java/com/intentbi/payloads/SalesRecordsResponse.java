package com.intentbi.payloads;

import com.intentbi.entities.SalesRecord;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SalesRecordsResponse {
    private  long total;
    private long  totalPages;
    private  int perPage;
    private  long currentPage;
    private boolean nextPage;
    private boolean prevPage;

    private List<SalesRecord> salesRecords;

}
