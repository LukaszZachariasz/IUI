package com.foodorderback.service;

import com.foodorderback.model.UserPayment;

public interface IUserPaymentService {

    UserPayment findById(Long id);

    void removeById(Long id);
}
