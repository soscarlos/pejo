package com.rmc.pejo.endpoints;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.exceptions.ResourceNotFoundException;
import com.rmc.pejo.service.JwtTokenService;
import com.rmc.pejo.service.PetService;
import com.rmc.pejo.service.ReminderService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static com.rmc.pejo.entity.PetType.CAT;
import static com.rmc.pejo.entity.SexType.FEMALE;
import static org.mockito.Mockito.*;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureWebTestClient
@WithMockUser
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PetEndPointTest {
    String uri = "/pets";

    long testId1 = 1;
    long testId2 = 2;
    LocalDate testDate = LocalDate.now().minusYears(3);

    Pet testPet = Pet.builder()
            .id(testId1)
            .name("Testy")
            .birthDate(testDate)
            .petType(CAT)
            .sexType(FEMALE)
            .build();
    Reminder testReminder1 = Reminder.builder()
            .id(testId1)
            .title("Test reminder")
            .description(" Test description")
            .date(testDate)
            .time(LocalTime.now())
            .active(true)
            .build();
    Reminder testReminder2 = Reminder.builder()
            .id(testId2)
            .title("Test reminder 2")
            .description(" Test description 2")
            .date(testDate)
            .time(LocalTime.now())
            .active(true)
            .build();
    @MockBean
    PetService petService;
    @MockBean
    ReminderService reminderService;
    @Autowired
    JwtTokenService tokenService;
    @Autowired
    private WebTestClient webTestClient;
    String token;
    @BeforeAll
    void setUp() {
        token = tokenService.generateToken(new UsernamePasswordAuthenticationToken("user", "password"));
    }

    @Test
    void save() {
        webTestClient.post()
                .uri(uri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(token))
                .bodyValue(testPet)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).save(testPet);
    }

    @Test
    void getAll() {
        webTestClient.get()
                .uri(uri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(token))
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).getAll();
    }

    @Test
    void getAllWithoutTokenReturnStatusUnauthorized() {
        webTestClient.get()
                .uri(uri)
                .exchange()
                .expectStatus()
                .isUnauthorized();

        verify(petService, never()).getAll();
    }

    @Test
    void getOneFound() {
        String getOneUri = uri + "/" + testId1;
        when(petService.get(testId1)).thenReturn(Optional.of(testPet));

        webTestClient.get()
                .uri(getOneUri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(token))
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).get(testId1);
    }

    @Test
    void getOneNotFound() {
        String getOneUri = uri + "/" + testId2;

        webTestClient.get()
                .uri(getOneUri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(token))
                .exchange()
                .expectStatus()
                .isNotFound();

        verify(petService).get(testId2);
    }

    @Test
    void update() {
        Pet updatePet = Pet.builder()
                .id(testId1)
                .name("Testy updated")
                .birthDate(testDate)
                .petType(CAT)
                .sexType(FEMALE)
                .build();

        webTestClient.put()
                .uri(uri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(token))
                .bodyValue(updatePet)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).update(updatePet);
    }

    @Test
    void addReminderSuccessful() {
        String reminderUri = uri + "/" + testId1;
        when(petService.addReminder(testId1, testReminder1)).thenReturn(Optional.of(testPet));

        webTestClient.put()
                .uri(reminderUri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(token))
                .bodyValue(testReminder1)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).addReminder(testId1, testReminder1);
    }

    @Test
    void addReminderPetNotFound() {
        String reminderUri = uri + "/" + testId2;

        webTestClient.put()
                .uri(reminderUri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(token))
                .bodyValue(testReminder2)
                .exchange()
                .expectStatus()
                .isNotFound();

        verify(petService).addReminder(testId2, testReminder2);
    }

    @Test
    void deleteById() {
        String deleteUri = uri + "/" + testId1;
        when(petService.get(testId1)).thenReturn(Optional.of(testPet));

        webTestClient.delete()
                .uri(deleteUri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(token))
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).delete(testId1);
    }

    @Test
    void getPetsByReminderIdSuccessful() {
        String filterUri = uri + "/reminder/" + testId1;
        when(reminderService.get(testId1)).thenReturn(Optional.of(testReminder1));

        webTestClient.get()
                .uri(filterUri)
                .headers(httpHeaders -> httpHeaders.setBearerAuth(token))
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).getPetsByReminderId(testId1);
    }
}