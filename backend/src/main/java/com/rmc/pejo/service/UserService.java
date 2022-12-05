package com.rmc.pejo.service;

import com.rmc.pejo.entity.ConfirmationToken;
import com.rmc.pejo.entity.User;
import com.rmc.pejo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private static final int EXPIRATION_TIME = 15;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ConfirmationTokenService tokenService;
    private final Clock clock;
    private final String notFoundMessage = "User with email %s not found";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() ->
                new UsernameNotFoundException(String.format(notFoundMessage, username)));
    }

    public String signUpUser(User user) {
        boolean userExists = userRepository.findByEmail(user.getEmail()).isPresent();
        if (userExists) {
            User existingUser = userRepository.findByEmail(user.getEmail()).get();
            if (existingUser.isEnabled()) throw new IllegalStateException("Email is already taken");
        } else {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            userRepository.save(user);
        }

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(clock),
                LocalDateTime.now(clock).plusMinutes(EXPIRATION_TIME),
                user);
        tokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    public void enableUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalStateException(String.format(notFoundMessage, userEmail)));
        user.setEnabled(true);
        userRepository.save(user);
    }
}
