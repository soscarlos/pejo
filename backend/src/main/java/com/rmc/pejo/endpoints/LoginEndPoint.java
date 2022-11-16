package com.rmc.pejo.endpoints;

import com.rmc.pejo.service.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginEndPoint {
    private final JwtTokenService jwtTokenService;

    @PostMapping
    String login(Authentication authentication) {
        return jwtTokenService.generateToken(authentication);
    }
}
