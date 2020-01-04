package com.foodorderback.service;

import com.foodorderback.model.User;
import com.foodorderback.security.UserRole;

import java.util.Set;

public interface IUserManagementService {

    User createUser(User user, Set<UserRole> userRoles);

    User findByUsername(String username);

    User findByEmail(String email);

    User save(User user);

    User findById(Long id);

}
