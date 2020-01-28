package com.foodorderback.service.implementations;

import com.foodorderback.model.*;
import com.foodorderback.repository.BillingAddressRepository;
import com.foodorderback.repository.OrderRepository;
import com.foodorderback.repository.PaymentOrderRepository;
import com.foodorderback.repository.ShippingAddressRepository;
import com.foodorderback.service.IOrderService;
import com.foodorderback.utility.MailUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
public class OrderService implements IOrderService {



    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BillingAddressRepository billingAddressRepository;

    @Autowired
    private ShippingAddressRepository shippingAddressRepository;

    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private FoodService foodService;

    @Autowired
    private MailUtility mailUtility;


    @Override
    public synchronized Order createOrder(ShoppingCart shoppingCart, ShippingAddress shippingAddress,
                             BillingAddress billingAddress, PaymentOrder paymentOrder,
                             String shippingMethod, User user) {
        Order order = new Order();
        order.setBillingAddress(billingAddress);
        order.setOrderStatus("created");
        order.setPaymentOrder(paymentOrder);
        order.setShippingAddress(shippingAddress);
        order.setShippingMethod(shippingMethod);

        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

        for(CartItem cartItem: cartItemList) {
            Food food = cartItem.getFood();
            cartItem.setOrder(order);
        }

        order.setCartItemList(cartItemList);
        order.setOrderDate(Calendar.getInstance().getTime());
        order.setOrderTotal(shoppingCart.getGrandTotal());
        shippingAddress.setOrder(order);
        billingAddress.setOrder(order);
        paymentOrder.setOrder(order);
        order.setUser(user);
        order = orderRepository.save(order);

        return order;

    }

    public Order findOne(Long id) {
        return orderRepository.findById(id).get();
    }
}
