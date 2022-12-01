package com.rmc.pejo.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class RegistrationServiceTest {

    @Mock
    UserService userService;

    @Mock
    ConfirmationTokenService tokenService;

    @Mock
    EmailValidatorService validatorService;

    @Mock
    EmailSender sender;

    @InjectMocks
    RegistrationService registrationService;

    @BeforeEach
    void initialize() {
    }

    @Test
    void register() {
    }

    @Test
    void confirmToken() {
    }
}