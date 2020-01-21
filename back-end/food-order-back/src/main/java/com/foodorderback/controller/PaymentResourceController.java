package com.foodorderback.controller;

import com.foodorderback.service.implementations.UserPaymentService;
import com.foodorderback.service.implementations.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
public class PaymentResourceController {

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private UserPaymentService userPaymentService;

}
