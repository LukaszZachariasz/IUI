package com.foodorderback.service.implementations;

import com.foodorderback.model.UserShipping;
import com.foodorderback.repository.UserShippingRepository;
import com.foodorderback.service.IUserShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserShippingService implements IUserShippingService {

    @Autowired
    private UserShippingRepository userShippingRepository;

    @Override
    public UserShipping findById(Long id) {
        return userShippingRepository.findById(id).get();
    }

    @Override
    public void removeById(Long id) {
        userShippingRepository.deleteById(id);
    }
}
