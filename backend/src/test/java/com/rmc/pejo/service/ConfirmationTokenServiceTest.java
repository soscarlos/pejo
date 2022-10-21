package com.rmc.pejo.service;

import com.rmc.pejo.entity.ConfirmationToken;
import com.rmc.pejo.repository.ConfirmationTokenRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ConfirmationTokenServiceTest {

    ConfirmationToken testToken = new ConfirmationToken();

    String testStringToken = "token";

    @Mock
    ConfirmationTokenRepository repository;

    @InjectMocks
    ConfirmationTokenService service;

    @Test
    void saveConfirmationToken() {
        service.saveConfirmationToken(testToken);

        verify(repository).save(testToken);
    }

    @Test
    void findToken() {
        service.findToken(testStringToken);

        verify(repository).findByToken(testStringToken);
    }

    @Test
    void setConfirmedAtFindsToken() {
        when(repository.findByToken(testStringToken)).thenReturn(Optional.of(testToken));

        service.setConfirmedAt(testStringToken);

        verify(repository).findByToken(testStringToken);
        verify(repository).save(any(ConfirmationToken.class));
    }

    @Test
    void setConfirmedAtDoesNotFindToken() {
        when(repository.findByToken(testStringToken)).thenReturn(Optional.empty());

        service.setConfirmedAt(testStringToken);

        verify(repository).findByToken(testStringToken);
        verify(repository, never()).save(any(ConfirmationToken.class));
    }
}