package com.foodorderback.service;

import com.foodorderback.model.User;
import com.foodorderback.model.UserBilling;
import com.foodorderback.model.UserPayment;
import com.foodorderback.model.UserShipping;
import com.foodorderback.security.UserRole;

import java.util.Set;

public interface IUserManagementService {

    User createUser(User user, Set<UserRole> userRoles);

    User findByUsername(String username);

    User findByEmail(String email);

    User save(User user);

    User findById(Long id);

    void updateUserPaymentInfo(UserBilling userBilling, UserPayment userPayment, User user);

    void updateUserBillingInfo(UserBilling userBilling, UserPayment userPayment, User user);

    void setUserDefaultPayment(Long userPaymentId, User user);

    void updateUserShippingInfo(UserShipping userShipping, User user);

    void setUserDefaultShipping(Long userShippingId, User user);


}
