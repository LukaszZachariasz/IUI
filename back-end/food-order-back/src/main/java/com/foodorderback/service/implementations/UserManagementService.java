package com.foodorderback.service.implementations;


import com.foodorderback.model.User;
import com.foodorderback.repository.RoleRepository;
import com.foodorderback.repository.UserRepository;
import com.foodorderback.security.UserRole;
import com.foodorderback.service.IUserManagement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;

@Service
public class UserManagementService implements IUserManagement {

    private static final Logger logger = LoggerFactory.getLogger(UserManagementService.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    @Transactional
    public User createUser(User user, Set<UserRole> userRoles) {
        User localUser = userRepository.findByUsername(user.getUsername());

        if (localUser != null) {
            logger.info("Already in database " + localUser.getUsername());
        } else {
            for (UserRole ur: userRoles) {
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            localUser = userRepository.save(user);
        }

        return localUser;
    }
}
