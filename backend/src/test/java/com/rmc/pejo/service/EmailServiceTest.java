package com.rmc.pejo.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.mail.javamail.JavaMailSender;


import javax.mail.internet.MimeMessage;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;

class EmailServiceTest {
    @Mock
    JavaMailSender mailSender;
    @InjectMocks
    EmailService service;

    MimeMessage testMessage;

    @BeforeEach
    void initialize() {
        testMessage = mailSender.createMimeMessage();
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