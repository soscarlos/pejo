package com.rmc.pejo.service;

import com.rmc.pejo.endpoints.request.RegistrationRequest;
import com.rmc.pejo.entity.ConfirmationToken;
import com.rmc.pejo.entity.User;
import com.rmc.pejo.service.clock.DateTimeProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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
    @Mock
    Clock clock;
    @InjectMocks
    RegistrationService registrationService;

    DateTimeProvider provider = new DateTimeProvider();
    ZonedDateTime NOW_FIXED = provider.getZonedDateTime();
    LocalDateTime NOW = provider.getLocalDateTime();
    RegistrationRequest request = new RegistrationRequest("First Name",
            "Last Name",
            "password",
            "test@mail.com");

    @Test
    void registerSuccessfullyCallsUserServiceAndEmailSenderMethods() {
        when(validatorService.test(request.email())).thenReturn(true);

        registrationService.register(request);

        verify(userService).signUpUser(any(User.class));
        verify(sender).send(anyString(), anyString(), anyString());
    }

    @Test
    void registrationAttemptWithoutValidEmailThrowsIllegalStateException() {

        assertThrows(IllegalStateException.class, () -> registrationService.register(request));
    }

    @Test
    void registerSuccessfullyReturnsString() {
        String expected = "Test string";
        when(validatorService.test(request.email())).thenReturn(true);
        when(userService.signUpUser(any(User.class))).thenReturn(expected);

        String actual = registrationService.register(request);

        assertEquals(expected, actual);
    }

    @Test
    void confirmTokenSuccessfullyCallsTokenServiceAndUserServiceMethods() {
        User testUser = User.builder().email("test@mail.com").build();
        when(clock.getZone()).thenReturn(NOW_FIXED.getZone());
        when(clock.instant()).thenReturn(NOW_FIXED.toInstant());
        LocalDateTime mockedNow = NOW;
        ConfirmationToken token = new ConfirmationToken("token", mockedNow, mockedNow.plusSeconds(1L), testUser);
        when(tokenService.findToken(anyString())).thenReturn(Optional.of(token));

        String result = registrationService.confirmToken(anyString());

        verify(tokenService).setConfirmedAt(anyString());
        verify(userService).enableUser(anyString());

        String expectedMessage = "confirmed";
        assertEquals(expectedMessage, result);
    }

    @Test
    void confirmTokenIfConfirmAtIsPresentThrowsIllegalState() {
        ConfirmationToken token = new ConfirmationToken();
        token.setConfirmedAt(NOW);
        when(tokenService.findToken(anyString())).thenReturn(Optional.of(token));

        assertThrows(IllegalStateException.class, () -> registrationService.confirmToken(anyString()));
    }

    @Test
    void confirmTokenIfTokenExpiredShouldThrowIllegalStateException() {
        User testUser = User.builder().email("test@mail.com").build();
        when(clock.getZone()).thenReturn(NOW_FIXED.getZone());
        when(clock.instant()).thenReturn(NOW_FIXED.toInstant());
        LocalDateTime mockedNow = NOW;
        ConfirmationToken token = new ConfirmationToken("token", mockedNow, mockedNow.minusSeconds(1L), testUser);
        when(tokenService.findToken(anyString())).thenReturn(Optional.of(token));

        IllegalStateException exception = assertThrows(IllegalStateException.class, () ->
                registrationService.confirmToken(anyString()));

        String expectedMessage = "token expired";
        assertEquals(expectedMessage, exception.getMessage());
    }
}