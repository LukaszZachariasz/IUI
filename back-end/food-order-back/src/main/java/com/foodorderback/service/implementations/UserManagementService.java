package com.foodorderback.service.implementations;


import com.foodorderback.model.*;
import com.foodorderback.repository.*;
import com.foodorderback.security.UserRole;
import com.foodorderback.service.IShoppingCartService;
import com.foodorderback.service.IUserManagementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class UserManagementService implements IUserManagementService {

    private static final Logger logger = LoggerFactory.getLogger(UserManagementService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserBillingRepository userBillingRepository;

    @Autowired
    private UserPaymentRepository userPaymentRepository;

    @Autowired
    private UserShippingRepository userShippingRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Override
    @Transactional
    public User createUser(User user, Set<UserRole> userRoles) {
        User localUser = userRepository.findByUsername(user.getUsername());

        if (localUser != null) {
            logger.info("Already in database " + localUser.getUsername());
        } else {
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            user.setUserPaymentList(new ArrayList<UserPayment>());
            ShoppingCart shoppingCart = new ShoppingCart();
            shoppingCart.setUser(user);
            shoppingCart = shoppingCartRepository.save(shoppingCart);
            user.setShoppingCart(shoppingCart);
            user.setUserShippingList(new ArrayList<UserShipping>());
            localUser = userRepository.save(user);
        }

        return localUser;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public void updateUserPaymentInfo(UserBilling userBilling, UserPayment userPayment, User user) {
        save(user);
        userPayment.setUser(user);
        userBilling.setUserPayment(userPayment);
        userBillingRepository.save(userBilling);
        userPaymentRepository.save(userPayment);
    }

    @Override
    public void updateUserBillingInfo(UserBilling userBilling, UserPayment userPayment, User user) {
        userPayment.setUser(user);
        userPayment.setUserBilling(userBilling);
        userPayment.setDefaultPayment(true);
        userBilling.setUserPayment(userPayment);
        user.getUserPaymentList().add(userPayment);
        save(user);
    }

    @Override
    public void updateUserShippingInfo(UserShipping userShipping, User user) {
        userShipping.setUser(user);
        userShipping.setUserShippingDefault(true);
        user.getUserShippingList().add(userShipping);
        save(user);
    }

    @Override
    public void setUserDefaultPayment(Long userPaymentId, User user) {
        List<UserPayment> userPaymentList = (List<UserPayment>) userPaymentRepository.findAll();

        for (UserPayment userPayment : userPaymentList) {
            if (userPayment.getId().longValue() == userPaymentId.longValue()) {
                userPayment.setDefaultPayment(true);
            } else {
                userPayment.setDefaultPayment(false);
            }
            userPaymentRepository.save(userPayment);
        }
    }

    @Override
    public void setUserDefaultShipping(Long userShippingId, User user) {
        List<UserShipping> userShippingList = (List<UserShipping>) userShippingRepository.findAll();

        for (UserShipping userShipping : userShippingList) {
            if (userShipping.getId().longValue() == userShippingId.longValue()) {
                userShipping.setUserShippingDefault(true);
            } else {
                userShipping.setUserShippingDefault(false);
            }
            userShippingRepository.save(userShipping);
        }
    }

}
