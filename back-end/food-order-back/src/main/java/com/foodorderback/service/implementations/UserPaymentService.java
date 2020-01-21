package com.foodorderback.service.implementations;

import com.foodorderback.model.UserPayment;
import com.foodorderback.repository.UserPaymentRepository;
import com.foodorderback.service.IUserPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPaymentService implements IUserPaymentService {

    @Autowired
    private UserPaymentRepository userPaymentRepository;


    @Override
    public UserPayment findById(Long id) {
        return userPaymentRepository.findById(id).get();
    }

    @Override
    public void removeById(Long id) {
        userPaymentRepository.deleteById(id);
    }
}
