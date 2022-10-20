package com.rmc.pejo.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {
    @Mock
    JavaMailSender mailSender;
    @InjectMocks
    EmailService service;
    MimeMessage testMessage;

    @BeforeEach
    void initialize() {
        testMessage = new MimeMessage((Session) null);
        when(mailSender.createMimeMessage()).thenReturn(testMessage);
    }

    @Test
    void sendSuccesfullAttempt() {
        String to = "test@mail.com";
        String email = "email";
        service.send(to, email);

        verify(mailSender).createMimeMessage();
        verify(mailSender).send(testMessage);
    }

    @Test
    void sendThrowsIllegalStateExceptionWhenMailMalformed() {
        String to = "@mail.com";
        String email = "email";
        assertThrows(IllegalStateException.class, () -> service.send(to, email));
    }
}