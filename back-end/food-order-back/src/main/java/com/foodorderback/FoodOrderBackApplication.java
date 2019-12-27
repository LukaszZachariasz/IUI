package com.foodorderback;

import com.foodorderback.config.SecurityUtility;
import com.foodorderback.model.User;
import com.foodorderback.security.Role;
import com.foodorderback.security.UserRole;
import com.foodorderback.service.implementations.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class FoodOrderBackApplication implements CommandLineRunner {

	@Autowired
	UserManagementService userManagementService;

    public static void main(String[] args) {
        SpringApplication.run(FoodOrderBackApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
		User u1 = new User();
		u1.setUsername("Lukasz");
		u1.setPassword(SecurityUtility.passwordEncoder().encode("superhaslo"));
		Set<UserRole> userRoles = new HashSet<>();
		Role role1 = new Role();
		role1.setRoleId(1);
		role1.setName("ROLE_ADMIN");
		userRoles.add(new UserRole(role1,u1));

		userManagementService.createUser(u1, userRoles);

		userRoles.clear();

    }
}
