package com.foodorderback.utility;

import com.foodorderback.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Properties;

@Component
public class MailUtility {

    @Autowired
    private ConfigurableApplicationContext ctx;

    public SimpleMailMessage generateUserEmail(User user, String password) {

        String message = "Please use this credentials to login to your Account (Username: " + user.getUsername() + " Password: " + password + ")";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("It's Your new user account to Food Order Service");
        email.setText(message);
        email.setFrom(Objects.requireNonNull(ctx.getEnvironment().getProperty("support.email")));

        return email;
    }

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(ctx.getEnvironment().getProperty("spring.mail.host"));
        mailSender.setPort(587);

        mailSender.setUsername(ctx.getEnvironment().getProperty("spring.mail.username"));
        mailSender.setPassword(ctx.getEnvironment().getProperty("spring.mail.password"));

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
