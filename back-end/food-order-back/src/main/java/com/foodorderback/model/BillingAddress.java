package com.foodorderback.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class BillingAddress implements Serializable {

    private static final long serialVersionUID = 43225L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String billingName;

    private String billingCity;

    private String billingStreet;

    private String billingHouseNr;

    private String billingApartmentNr;

    private String billingZipCode;

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

    public String getBillingName() {
        return billingName;
    }

    public void setBillingName(String billingName) {
        this.billingName = billingName;
    }

    public String getBillingCity() {
        return billingCity;
    }

    public void setBillingCity(String billingCity) {
        this.billingCity = billingCity;
    }

    public String getBillingStreet() {
        return billingStreet;
    }

    public void setBillingStreet(String billingStreet) {
        this.billingStreet = billingStreet;
    }

    public String getBillingHouseNr() {
        return billingHouseNr;
    }

    public void setBillingHouseNr(String billingHouseNr) {
        this.billingHouseNr = billingHouseNr;
    }

    public String getBillingApartmentNr() {
        return billingApartmentNr;
    }

    public void setBillingApartmentNr(String billingApartmentNr) {
        this.billingApartmentNr = billingApartmentNr;
    }

    public String getBillingZipCode() {
        return billingZipCode;
    }

    public void setBillingZipCode(String billingZipCode) {
        this.billingZipCode = billingZipCode;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
