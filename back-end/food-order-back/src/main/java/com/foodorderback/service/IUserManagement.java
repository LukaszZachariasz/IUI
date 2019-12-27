package com.foodorderback.service;

import com.foodorderback.model.User;
import com.foodorderback.security.UserRole;

import java.util.Set;

public interface IUserManagement {

    User createUser(User user, Set<UserRole> userRoles);


}
