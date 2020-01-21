package com.foodorderback.repository;

import com.foodorderback.model.UserPayment;
import com.foodorderback.security.Role;
import org.springframework.data.repository.CrudRepository;

public interface UserPaymentRepository extends CrudRepository<UserPayment, Long> {
}
