package com.intentbi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;


@Entity
@Table(name = "saleRecords")
@Data
public class SalesRecord {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long salesId;


    @NotBlank(message = "Market must not be blank")
    private String market;

    @NotBlank(message = "Country must not be blank")
    private String country;

    @NotBlank(message = "Product must not be blank")
    private String product;

    @NotBlank(message = "Discount Band must not be blank")
    private String discountBand;

    @PositiveOrZero(message = "Units Sold must be a positive number or zero")
    private double unitsSold;

    @PositiveOrZero(message = "Manufacturing Price must be a positive number or zero")
    private double manufacturingPrice;

    @PositiveOrZero(message = "Sale Price must be a positive number or zero")
    private double salePrice;

    @PositiveOrZero(message = "Gross Sales must be a positive number or zero")
    private double grossSales;

    @PositiveOrZero(message = "Discounts must be a positive number or zero")
    private double discounts;

    @PositiveOrZero(message = "Sales must be a positive number or zero")
    private double sales;

    @PositiveOrZero(message = "COGS must be a positive number or zero")
    private double cogs;

    @PositiveOrZero(message = "Profit must be a positive number or zero")
    private double profit;

    @NotNull(message = "Date must not be null")
    private Date date;

    @Min(value = 1, message = "Month Number must be between 1 and 12")
    @Max(value = 12, message = "Month Number must be between 1 and 12")
    private int monthNumber;

    @NotBlank(message = "Month Name must not be blank")
    private String monthName;

    @Positive(message = "Year must be a positive number")
    private int year;
}
