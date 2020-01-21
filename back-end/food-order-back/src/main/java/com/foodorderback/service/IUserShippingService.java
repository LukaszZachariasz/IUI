package com.foodorderback.service;

import com.foodorderback.model.UserShipping;

public interface IUserShippingService {

    UserShipping findById(Long id);

    void removeById(Long id);

}
