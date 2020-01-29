package com.foodorderback.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Random;

@Component
public class SecurityUtility {

    private static final String SALT = "SALT_STRING_HANDED_WRITTEN";
    private static final int BAREST_STRENGTH = 12;

    @Bean
    public static BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(BAREST_STRENGTH,new SecureRandom(SALT.getBytes()));
    }

    @Bean
    public static String randomPassword() {
        String SALTCHARTS = "ABCDEFGHIJKLMNOPQRSTUWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rm = new Random();

        while(salt.length() < 15) {
            int index = (int) (rm.nextFloat() * SALTCHARTS.length());
            salt.append(SALTCHARTS.charAt(index));
        }

        return salt.toString();

    }
}
