package com.rmc.pejo.endpoints;

import com.rmc.pejo.endpoints.request.RegistrationRequest;
import com.rmc.pejo.entity.User;
import com.rmc.pejo.service.RegistrationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;

import static com.rmc.pejo.entity.UserRole.USER;
import static org.mockito.Mockito.verify;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class RegistrationEndPointTest {
    String uri = "/registration";

    RegistrationRequest testRequest = new RegistrationRequest(
            "Paul",
            "Muster",
            "paul@mail.com",
            "password1");

    User testUser = new User(
            "Paul",
            "Muster",
            "paul@mail.com",
            "password1",
            USER);

    String testToken = "token";

    @Autowired
    WebTestClient webTestClient;

    @MockBean
    RegistrationService service;

    @Test
    void register() {
        webTestClient.post()
                .uri(uri)
                .bodyValue(testRequest)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(service).register(testRequest);
    }

    @Test
    void confirm() {
        String confirmUri = uri + "/confirm?token=" + testToken;

        webTestClient.get()
                .uri(confirmUri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(service).confirmToken(testToken);
    }
}