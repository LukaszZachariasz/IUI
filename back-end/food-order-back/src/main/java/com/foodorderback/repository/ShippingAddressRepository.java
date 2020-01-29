package com.foodorderback.repository;

import com.foodorderback.model.Order;
import com.foodorderback.model.ShippingAddress;
import org.springframework.data.repository.CrudRepository;

public interface ShippingAddressRepository extends CrudRepository<ShippingAddress, Long> {
}
