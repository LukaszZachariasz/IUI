package com.foodorderback.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class ShippingAddress implements Serializable {

    private static final long serialVersionUID = 65421123L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String shippingName;

    private String shippingStreet;

    private String shippingCity;

    private String shippingZipCode;

    private String shippingHouseNr;

    private String shippingApartmentNr;

    private String shippingDefault;

    @OneToOne
    @JsonIgnore
    private Order order;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getShippingName() {
        return shippingName;
    }

    public void setShippingName(String shippingName) {
        this.shippingName = shippingName;
    }

    public String getShippingStreet() {
        return shippingStreet;
    }

    public void setShippingStreet(String shippingStreet) {
        this.shippingStreet = shippingStreet;
    }

    public String getShippingCity() {
        return shippingCity;
    }

    public void setShippingCity(String shippingCity) {
        this.shippingCity = shippingCity;
    }

    public String getShippingZipCode() {
        return shippingZipCode;
    }

    public void setShippingZipCode(String shippingZipCode) {
        this.shippingZipCode = shippingZipCode;
    }

    public String getShippingHouseNr() {
        return shippingHouseNr;
    }

    public void setShippingHouseNr(String shippingHouseNr) {
        this.shippingHouseNr = shippingHouseNr;
    }

    public String getShippingApartmentNr() {
        return shippingApartmentNr;
    }

    public void setShippingApartmentNr(String shippingApartmentNr) {
        this.shippingApartmentNr = shippingApartmentNr;
    }

    public String getShippingDefault() {
        return shippingDefault;
    }

    public void setShippingDefault(String shippingDefault) {
        this.shippingDefault = shippingDefault;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
