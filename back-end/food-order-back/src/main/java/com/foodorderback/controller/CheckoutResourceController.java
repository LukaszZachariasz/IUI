package com.foodorderback.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodorderback.model.*;
import com.foodorderback.service.implementations.OrderService;
import com.foodorderback.service.implementations.ShoppingCartService;
import com.foodorderback.service.implementations.UserManagementService;
import com.foodorderback.utility.MailUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;

@RestController
@RequestMapping("/checkout")
public class CheckoutResourceController {


    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserManagementService userManagementService;


    @Autowired
    private OrderService orderService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private MailUtility mailUtility;


    @PostMapping("/checkout")
    public Order checkoutPost(@RequestBody HashMap<String, Object> mapper,
                              Principal principal) {

        ObjectMapper om = new ObjectMapper();

        ShippingAddress shippingAddress = om.convertValue(mapper.get("shippingAddress"), ShippingAddress.class);
        BillingAddress billingAddress = om.convertValue(mapper.get("billingAddress"), BillingAddress.class);
        PaymentOrder paymentOrder = om.convertValue(mapper.get("payment"), PaymentOrder.class);
        String shippingMethod = (String) mapper.get("shippingMethod");

        ShoppingCart shoppingCart = userManagementService.findByUsername(principal.getName()).getShoppingCart();
        User user = userManagementService.findByUsername(principal.getName());
        Order order = orderService.createOrder(shoppingCart, shippingAddress, billingAddress, paymentOrder, shippingMethod, user);

        mailSender.send(mailUtility.generateOrderConfirmationEmail(user, order));
        shoppingCartService.clearShoppingCart(shoppingCart);

        return order;

    }
}
