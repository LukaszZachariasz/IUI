package com.foodorderback.controller;

import com.foodorderback.config.SecurityUtility;
import com.foodorderback.model.User;
import com.foodorderback.security.Role;
import com.foodorderback.security.UserRole;
import com.foodorderback.service.implementations.UserManagementService;
import com.foodorderback.utility.MailUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserResourceController {

    @Autowired
    UserManagementService userManagementService;

    @Autowired
    MailUtility mailUtility;

    @PostMapping("/newUser")
    @Transactional
    public ResponseEntity newUserCreate(HttpServletRequest request, @RequestBody HashMap<String, String> mapper) throws Exception {
        String username = mapper.get("username");
        String userEmail = mapper.get("email");

        if (userManagementService.findByUsername(username) != null) {
            return new ResponseEntity("usernameExists", HttpStatus.BAD_REQUEST);
        }

        if (userManagementService.findByEmail(userEmail) != null) {
            return new ResponseEntity("emailExists", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(userEmail);

        String password = SecurityUtility.randomPassword();
        String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
        user.setPassword(encryptedPassword);

        Role role = new Role();
        role.setRoleId(2);
        role.setName("ROLE_USER");
        Set<UserRole> userRoleSet = new HashSet<>();
        userRoleSet.add(new UserRole(role, user));
        userManagementService.createUser(user, userRoleSet);

        SimpleMailMessage simpleMailMessage = mailUtility.generateUserEmail(user, password);
        mailUtility.getJavaMailSender().send(simpleMailMessage);

        return new ResponseEntity("User created!", HttpStatus.OK);
    }
}
