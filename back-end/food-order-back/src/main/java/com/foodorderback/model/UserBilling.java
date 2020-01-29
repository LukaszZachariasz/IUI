package com.foodorderback.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class UserBilling implements Serializable {


    private static final long serialVersionUID = 990099522L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String userBillingName;

    private String userBillingCity;

    private String userBillingCountry;

    private String userBillingStreet;

    private String userBillingHouseNr;

    private String userBillingApartmentNr;

    private String userBillingZipCode;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private UserPayment userPayment;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserBillingName() {
        return userBillingName;
    }

    public void setUserBillingName(String userBillingName) {
        this.userBillingName = userBillingName;
    }

    public String getUserBillingCity() {
        return userBillingCity;
    }

    public void setUserBillingCity(String userBillingCity) {
        this.userBillingCity = userBillingCity;
    }

    public String getUserBillingCountry() {
        return userBillingCountry;
    }

    public void setUserBillingCountry(String userBillingCountry) {
        this.userBillingCountry = userBillingCountry;
    }

    public String getUserBillingStreet() {
        return userBillingStreet;
    }

    public void setUserBillingStreet(String userBillingStreet) {
        this.userBillingStreet = userBillingStreet;
    }

    public String getUserBillingHouseNr() {
        return userBillingHouseNr;
    }

    public void setUserBillingHouseNr(String userBillingHouseNr) {
        this.userBillingHouseNr = userBillingHouseNr;
    }

    public String getUserBillingApartmentNr() {
        return userBillingApartmentNr;
    }

    public void setUserBillingApartmentNr(String userBillingApartmentNr) {
        this.userBillingApartmentNr = userBillingApartmentNr;
    }

    public String getUserBillingZipCode() {
        return userBillingZipCode;
    }

    public void setUserBillingZipCode(String userBillingZipCode) {
        this.userBillingZipCode = userBillingZipCode;
    }

    public UserPayment getUserPayment() {
        return userPayment;
    }

    public void setUserPayment(UserPayment userPayment) {
        this.userPayment = userPayment;
    }
}
