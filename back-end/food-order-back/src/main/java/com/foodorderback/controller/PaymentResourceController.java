package com.foodorderback.controller;

import com.foodorderback.model.User;
import com.foodorderback.model.UserBilling;
import com.foodorderback.model.UserPayment;
import com.foodorderback.service.implementations.UserPaymentService;
import com.foodorderback.service.implementations.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentResourceController {

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private UserPaymentService userPaymentService;

    @PostMapping("/add")
    public ResponseEntity addNewCreditCardPost(@RequestBody UserPayment userPayment,
                                               Principal principal) {

        User user = userManagementService.findByUsername(principal.getName());
        UserBilling userBilling = userPayment.getUserBilling();
        userManagementService.updateUserPaymentInfo(userBilling, userPayment, user);

        return new ResponseEntity("Payment Added (Updated) Successfully", HttpStatus.OK);
    }

    @PostMapping("/remove")
    public ResponseEntity removePaymentPost(@RequestBody String id,
                                            Principal principal) {

        userPaymentService.removeById(Long.parseLong(id));

        return new ResponseEntity("Payment Removed Successfully", HttpStatus.OK);
    }

    @PostMapping("/setDefault")
    public ResponseEntity setDefaultPaymentPost(@RequestBody String id,
                                                Principal principal) {

        User user = userManagementService.findByUsername(principal.getName());
        userManagementService.setUserDefaultPayment(Long.parseLong(id), user);

        return new ResponseEntity("Set Default Successfully", HttpStatus.OK);
    }

    @GetMapping("/getUserPaymentList")
    public List<UserPayment> getUserPaymentList(Principal principal) {

        User user = userManagementService.findByUsername(principal.getName());
        List<UserPayment> userPaymentList = user.getUserPaymentList();

        return userPaymentList;
    }


}
