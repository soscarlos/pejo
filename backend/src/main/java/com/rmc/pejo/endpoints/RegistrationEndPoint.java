package com.rmc.pejo.endpoints;

import com.rmc.pejo.endpoints.request.RegistrationRequest;
import com.rmc.pejo.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("registration")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RegistrationEndPoint {
    private final RegistrationService service;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        return service.register(request);
    }

    @GetMapping("confirm")
    public String confirm(@RequestParam("token") String token) {
        return service.confirmToken(token);
    }
}
