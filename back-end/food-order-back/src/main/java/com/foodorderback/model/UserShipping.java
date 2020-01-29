package com.foodorderback.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class UserShipping implements Serializable {

    private static final long serialVersionUID = 19823L;

    @Id()
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String userShippingName;

    private String userShippingStreet;

    private String userShippingCity;

    private String userShippingZipCode;

    private String userShippingHouseNr;

    private String userShippingApartmentNr;

    private Boolean userShippingDefault;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserShippingName() {
        return userShippingName;
    }

    public void setUserShippingName(String userShippingName) {
        this.userShippingName = userShippingName;
    }

    public String getUserShippingStreet() {
        return userShippingStreet;
    }

    public void setUserShippingStreet(String userShippingStreet) {
        this.userShippingStreet = userShippingStreet;
    }

    public String getUserShippingCity() {
        return userShippingCity;
    }

    public void setUserShippingCity(String userShippingCity) {
        this.userShippingCity = userShippingCity;
    }

    public String getUserShippingZipCode() {
        return userShippingZipCode;
    }

    public void setUserShippingZipCode(String userShippingZipCode) {
        this.userShippingZipCode = userShippingZipCode;
    }

    public String getUserShippingHouseNr() {
        return userShippingHouseNr;
    }

    public void setUserShippingHouseNr(String userShippingHouseNr) {
        this.userShippingHouseNr = userShippingHouseNr;
    }

    public String getUserShippingApartmentNr() {
        return userShippingApartmentNr;
    }

    public void setUserShippingApartmentNr(String userShippingApartmentNr) {
        this.userShippingApartmentNr = userShippingApartmentNr;
    }

    public Boolean getUserShippingDefault() {
        return userShippingDefault;
    }

    public void setUserShippingDefault(Boolean userShippingDefault) {
        this.userShippingDefault = userShippingDefault;
    }
}

