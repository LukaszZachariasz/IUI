package com.foodorderback.res;

import com.foodorderback.service.implementations.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;

/**
 * @author Łukasz Zachariasz
 */

@RestController
public class LoginResource {

    @Autowired
    private UserManagementService userManagementService;

    @RequestMapping("/token")
    public Map<String, String> token(HttpSession session, HttpServletRequest request) {

        String remoteHost = request.getRemoteHost();
        int portNumber = request.getRemotePort();

        System.out.println(remoteHost + ":" + portNumber);
        System.out.println(request.getRemoteAddr());
        System.out.println(Collections.singletonMap("token", session.getId()));

        return Collections.singletonMap("token", session.getId());
    }

    @RequestMapping("/checkSession")
    public ResponseEntity checkSession() {
        return new ResponseEntity("Session Active!", HttpStatus.OK);
    }

    @PostMapping("/user/logoutMe")
    public ResponseEntity logout() {
        SecurityContextHolder.clearContext();
        return new ResponseEntity("Logout!", HttpStatus.OK);
    }
}
