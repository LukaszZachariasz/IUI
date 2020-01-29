package com.foodorderback.service;

import com.foodorderback.model.*;

import java.util.List;

public interface IOrderService {

    Order createOrder(ShoppingCart shoppingCart,
                      ShippingAddress shippingAddress,
                      BillingAddress billingAddress,
                      PaymentOrder paymentOrder,
                      String shippingMethod,
                      User user);

}
