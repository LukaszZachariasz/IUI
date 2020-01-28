package com.foodorderback.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodorderback.model.*;
import com.foodorderback.service.implementations.CartItemService;
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
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Random;

@RestController
@RequestMapping("/checkout")
public class CheckoutResourceController {

    private Order order;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private CartItemService cartItemService;

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
        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
        User user = userManagementService.findByUsername(principal.getName());
        Order order = orderService.createOrder(shoppingCart, shippingAddress, billingAddress, paymentOrder, shippingMethod, user);

        System.out.println(order.getCartItemList().get(0));

        mailSender.send(mailUtility.generateOrderConfirmationEmail(user, order, Locale.ENGLISH));

        shoppingCartService.clearShoppingCart(shoppingCart);

        LocalDateTime today = LocalDateTime.now();
        LocalDateTime estimatedDeliveryDate = today.plusMinutes(new Random().nextInt(50) + 50);

        this.order = order;

        return order;

    }
}
