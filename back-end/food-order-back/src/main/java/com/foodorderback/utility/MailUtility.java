package com.foodorderback.utility;

import com.foodorderback.model.Order;
import com.foodorderback.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.internet.InternetAddress;
import java.util.Objects;
import java.util.Properties;

@Component
public class MailUtility {

    @Autowired
    private ConfigurableApplicationContext ctx;

    @Autowired
    private TemplateEngine templateEngine;

    public MimeMessagePreparator generateOrderConfirmationEmail(User user, Order order) {

        Context context = new Context();
        context.setVariable("order", order);
        context.setVariable("user", user);
        context.setVariable("cartItemList", order.getCartItemList());

        String text = templateEngine.process("orderConfirm", context);

        return mimeMessage -> {
            MimeMessageHelper email = new MimeMessageHelper(mimeMessage);
            email.setTo(user.getEmail());
            email.setSubject("Order Confirmation - " + order.getId());
            email.setText(text, true);
            email.setFrom(new InternetAddress(Objects.requireNonNull(ctx.getEnvironment().getProperty("spring.mail.username"))));
        };
    }

    public MimeMessagePreparator generateForgottenMail(User user, String password) {
        Context context = new Context();
        String username = user.getUsername();
        context.setVariable("username", username);
        context.setVariable("password", password);

        String text = templateEngine.process("emailPasswordForgotten", context);

        return mimeMessage -> {
            MimeMessageHelper email = new MimeMessageHelper(mimeMessage);
            email.setTo(user.getEmail());
            email.setSubject("Credentials - Forgotten Password");
            email.setText(text, true);
            email.setFrom(Objects.requireNonNull(ctx.getEnvironment().getProperty("spring.mail.username")));
        };
    }

    public MimeMessagePreparator generateNewAccountMail(String username, String password, String userEmail) {
        Context context = new Context();
        context.setVariable("username", username);
        context.setVariable("userEmail", userEmail);
        context.setVariable("password", password);

        String text = templateEngine.process("emailRegister", context);

        return mimeMessage -> {
            MimeMessageHelper email = new MimeMessageHelper(mimeMessage);
            email.setTo(userEmail);
            email.setSubject("Credentials - New Accout");
            email.setText(text, true);
            email.setFrom(Objects.requireNonNull(ctx.getEnvironment().getProperty("spring.mail.username")));
        };
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
