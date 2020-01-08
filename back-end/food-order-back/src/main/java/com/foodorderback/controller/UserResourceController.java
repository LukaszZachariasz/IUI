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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.security.Principal;
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

        try {
            User user = new User();
            user.setUsername(username);
            user.setEmail(userEmail);
            String password = SecurityUtility.randomPassword();

            SimpleMailMessage simpleMailMessage = mailUtility.generateUserEmail(user, password);
            mailUtility.getJavaMailSender().send(simpleMailMessage);

            String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
            user.setPassword(encryptedPassword);

            Role role = new Role();
            role.setRoleId(2);
            role.setName("ROLE_USER");
            Set<UserRole> userRoleSet = new HashSet<>();
            userRoleSet.add(new UserRole(role, user));
            userManagementService.createUser(user, userRoleSet);

        } catch (Exception e) {
            return new ResponseEntity("failed", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity("userCreated", HttpStatus.OK);
    }


    @PostMapping("/forgetPassword")
    @Transactional
    public ResponseEntity forgetPassword(HttpServletRequest request, @RequestBody HashMap<String, String> mapper) throws Exception {

        User user = userManagementService.findByEmail(mapper.get("email"));

        if (user == null) {
            return new ResponseEntity("emailNotFound", HttpStatus.BAD_REQUEST);
        }

        try {

            String password = SecurityUtility.randomPassword();
            SimpleMailMessage simpleMailMessage = mailUtility.generateUserEmail(user, password);
            mailUtility.getJavaMailSender().send(simpleMailMessage);
            String encryptedPassword = SecurityUtility.passwordEncoder().encode(password);
            user.setPassword(encryptedPassword);

        } catch (Exception e) {
            return new ResponseEntity("failed", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity("emailSent", HttpStatus.OK);
    }


    @PostMapping("/updateUserInfo")
    public ResponseEntity updateUserInfo(@RequestBody HashMap<String, Object> mapper) throws Exception {

        int id = (int) mapper.get("id");
        String firstname = (String) mapper.get("firstname");
        String lastname = (String) mapper.get("lastname");
        String username = (String) mapper.get("username");
        String currentPassword = (String) mapper.get("currentPassword");
        String newPassword = (String) mapper.get("newPassword");
        Double weight = Double.parseDouble(mapper.get("weight").toString());
        Double height = Double.parseDouble(mapper.get("height").toString());
        String phoneNumber = (String) mapper.get("phoneNumber");
        String dateOfBirth = (String) mapper.get("dateOfBirth");
        String email = (String) mapper.get("email");

        User currentUser = userManagementService.findById(Long.valueOf(id));

        if (currentUser == null) {
            throw new Exception("UserDontExists");
        }

        if (userManagementService.findById(Long.valueOf(id)) == null) {
            return new ResponseEntity("usernameNotFound", HttpStatus.BAD_REQUEST);
        }

        BCryptPasswordEncoder passwordEncoder = SecurityUtility.passwordEncoder();
        String dbPassword = currentUser.getPassword();

        if (null != currentPassword) {
            if (passwordEncoder.matches(currentPassword, dbPassword)) {
                if (newPassword != null && !newPassword.isEmpty() && !newPassword.equals("")) {
                    currentUser.setPassword(passwordEncoder.encode(newPassword));
                }
            } else {
                return new ResponseEntity("invalidPassword", HttpStatus.BAD_REQUEST);
            }
        }

        // TODO: Date update of birth
        currentUser.setFirstname(firstname);
        currentUser.setLastname(lastname);
        currentUser.setEmail(email);
        currentUser.setHeight(height);
        currentUser.setWeight(weight);
        currentUser.setPhoneNumber(phoneNumber);
        currentUser.setFirstname(firstname);
        currentUser.setUsername(username);

        userManagementService.save(currentUser);

        return new ResponseEntity("updateSuccess", HttpStatus.OK);
    }

    @RequestMapping("/getCurrentUser")
    public User getCurrentUser(Principal principal) {
        User user = new User();
        if (null != principal) {
            user = userManagementService.findByUsername(principal.getName());
        }

        return user;
    }

}
