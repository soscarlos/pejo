package com.rmc.pejo.service;

import com.rmc.pejo.entity.ConfirmationToken;
import com.rmc.pejo.repository.ConfirmationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationTokenRepository repository;

    public void saveConfirmationToken(ConfirmationToken token) {
        repository.save(token);
    }

    public Optional<ConfirmationToken> findToken(String token) {
        return repository.findByToken(token);
    }

    public void setConfirmedAt(String token) {
        Optional<ConfirmationToken> optionalConfirmationToken = repository.findByToken(token);
        if (optionalConfirmationToken.isPresent()) {
            ConfirmationToken confirmationToken = optionalConfirmationToken.get();
            confirmationToken.setConfirmedAt(LocalDateTime.now());
            repository.save(confirmationToken);
        }
    }
}
