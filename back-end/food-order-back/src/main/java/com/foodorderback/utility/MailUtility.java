package com.foodorderback.utility;

import com.foodorderback.model.Order;
import com.foodorderback.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Locale;
import java.util.Objects;
import java.util.Properties;

@Component
public class MailUtility {

    @Autowired
    private ConfigurableApplicationContext ctx;

    @Autowired
    private TemplateEngine templateEngine;

    public SimpleMailMessage generateUserEmail(User user, String password) {

        String message = "Please use this credentials to login to your Account (Username: " + user.getUsername() + " Password: " + password + ")";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("It's Your new user account to Food Order Service");
        email.setText(message);
        email.setFrom(Objects.requireNonNull(ctx.getEnvironment().getProperty("support.email")));

        return email;
    }

    public MimeMessagePreparator generateOrderConfirmationEmail(User user, Order order, Locale locale) {

        Context context = new Context();
        context.setVariable("order", order);
        context.setVariable("user", user);
        context.setVariable("cartItemList", order.getCartItemList());

        String text = templateEngine.process("orderConfirm", context);


        MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper email = new MimeMessageHelper(mimeMessage);
                email.setTo(user.getEmail());
                email.setSubject("Order Confirmation - " + order.getId());
                email.setText(text, true);
                email.setFrom(new InternetAddress(""));
            }
        };

        return messagePreparator;
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
