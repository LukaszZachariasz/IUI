package com.foodorderback.repository;

import com.foodorderback.model.Order;
import com.foodorderback.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {

    List<Order> findByUser(User user);
}
