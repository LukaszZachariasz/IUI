package com.foodorderback.repository;

import com.foodorderback.model.BillingAddress;
import com.foodorderback.model.ShippingAddress;
import org.springframework.data.repository.CrudRepository;

public interface BillingAddressRepository extends CrudRepository<BillingAddress, Long> {
}
