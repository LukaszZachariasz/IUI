package com.foodorderback.repository;

import com.foodorderback.model.BillingAddress;
import com.foodorderback.model.Order;
import com.foodorderback.model.PaymentOrder;
import com.foodorderback.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PaymentOrderRepository extends CrudRepository<PaymentOrder, Long> {

}
