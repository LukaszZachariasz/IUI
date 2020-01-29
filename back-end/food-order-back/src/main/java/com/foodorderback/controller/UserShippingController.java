package com.foodorderback.controller;

import com.foodorderback.model.User;
import com.foodorderback.model.UserShipping;
import com.foodorderback.service.implementations.UserManagementService;
import com.foodorderback.service.implementations.UserShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/shipping")
public class UserShippingController {

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private UserShippingService userShippingService;

    @PostMapping("/add")
    public ResponseEntity addNewUserShippingPost(@RequestBody UserShipping userShipping,
                                               Principal principal) {

        User user = userManagementService.findByUsername(principal.getName());
        userManagementService.updateUserShippingInfo(userShipping, user);

        return new ResponseEntity("Shipping Added (Updated) Successfully", HttpStatus.OK);
    }

    @PostMapping("/remove")
    public ResponseEntity removeShippingPost(@RequestBody String id,
                                            Principal principal) {

        userShippingService.removeById(Long.parseLong(id));

        return new ResponseEntity("Shipping Removed Successfully", HttpStatus.OK);
    }

    @PostMapping("/setDefault")
    public ResponseEntity setDefaultShippingPost(@RequestBody String id,
                                                Principal principal) {

        User user = userManagementService.findByUsername(principal.getName());
        userManagementService.setUserDefaultShipping(Long.parseLong(id), user);

        return new ResponseEntity("Set Default Successfully", HttpStatus.OK);
    }

    @GetMapping("/getUserShippingList")
    public List<UserShipping> getUserShippingList(Principal principal) {

        User user = userManagementService.findByUsername(principal.getName());
        List<UserShipping> userShippingList = user.getUserShippingList();

        return userShippingList;
    }


}
