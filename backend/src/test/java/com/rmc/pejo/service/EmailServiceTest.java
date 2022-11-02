package com.rmc.pejo.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {
    @Mock
    JavaMailSender mailSender;
    @InjectMocks
    EmailService service;
    MimeMessage testMessage;
    MimeMessageHelper helper;

    @BeforeEach
    void initialize() throws MessagingException {
        EmailBuilder builder = new EmailBuilder();
        testMessage = mailSender.createMimeMessage();
        helper = new MimeMessageHelper(testMessage, "utf-8");
        String email = builder.buildEmail("test name", "link");
        helper.setText(email, true);
    }

    @Test
    void sendSuccesfullAttempt() {
        String to = "test@mail.com";
        String email = "email";

        service.send(to, email);

        verify(mailSender).createMimeMessage();
        verify(mailSender).send(testMessage);
    }
}