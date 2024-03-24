package com.intentbi.repositories;

import com.intentbi.entities.SalesRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesRecordRepository extends JpaRepository<SalesRecord,Long> {
}
