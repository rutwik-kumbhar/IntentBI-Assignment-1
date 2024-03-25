package com.intentbi.customeValidation;


import com.intentbi.entities.SalesRecord;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class ExcelSheetValidation {


    public static final List<String> sheetColumnList = Arrays.asList("Market", "Country", "Product", "Discount Band", "Units Sold", "Manufacturing Price", "Sale Price", "Gross Sales", "Discounts", "Sales", "COGS", "Profit", "Date", "Month Number", "Month Name", "Year");


    public static SalesRecord rowValidation(Row row) {

        SalesRecord salesRecord = new SalesRecord();

        String market =  row.getCell(0).getStringCellValue();
        String country = row.getCell(1).getStringCellValue();
        String product = row.getCell(2).getStringCellValue();
        String discountBand = row.getCell(3).getStringCellValue();

        double unitSold = row.getCell(4).getNumericCellValue();
        double manufacturingPrice = row.getCell(5).getNumericCellValue();
        double salePrice = row.getCell(6).getNumericCellValue();
        double grossSales = row.getCell(7).getNumericCellValue();
        double discounts = row.getCell(8).getNumericCellValue();
        double sales = row.getCell(9).getNumericCellValue();
        double cogs = row.getCell(10).getNumericCellValue();
        double profit = row.getCell(11).getNumericCellValue();
        Date date = row.getCell(12).getDateCellValue();
        int monthNumber = (int) row.getCell(13).getNumericCellValue();
        String monthName = row.getCell(14).getStringCellValue();
        int year = (int) row.getCell(15).getNumericCellValue();

            salesRecord.setMarket(market);
            salesRecord.setCountry(country);
            salesRecord.setProduct(product);
            salesRecord.setDiscountBand(discountBand);
            salesRecord.setUnitsSold(unitSold);
            salesRecord.setManufacturingPrice(manufacturingPrice);
            salesRecord.setSalePrice(salePrice);
            salesRecord.setGrossSales(grossSales);
            salesRecord.setDiscounts(discounts);
            salesRecord.setSales(sales);
            salesRecord.setCogs(cogs);
            salesRecord.setProfit(profit);
            salesRecord.setDate(date);
            salesRecord.setMonthNumber(monthNumber);
            salesRecord.setMonthName(monthName);
            salesRecord.setYear(year);

        return salesRecord;

    }

    public static boolean validateSheet(Sheet sheet) {

        for (int i = 0; i < sheetColumnList.size(); i++) {
            String columnName = sheet.getRow(0).getCell(i).toString();

            if (!sheetColumnList.get(i).equalsIgnoreCase(columnName)){
              return  false;
            }
        }
        return true;
    }
}
