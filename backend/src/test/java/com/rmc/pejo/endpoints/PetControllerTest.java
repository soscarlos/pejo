package com.rmc.pejo.endpoints;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.service.PetService;
import com.rmc.pejo.service.ReminderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.time.LocalDate;

import static com.rmc.pejo.entity.PetType.CAT;
import static com.rmc.pejo.entity.SexType.FEMALE;
import static org.mockito.Mockito.verify;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class PetControllerTest {
    private final String uri = "/pets";

    private final long testId1 = 1;
    private final long testId2 = 2;
    private final LocalDate testDate = LocalDate.now().minusYears(3);

    private final Pet testPet = Pet.builder()
            .id(testId1)
            .name("Testy")
            .birthDate(testDate)
            .petType(CAT)
            .sexType(FEMALE)
            .build();
    @Autowired
    WebTestClient webTestClient;
    @MockBean
    PetService petService;
    @MockBean
    ReminderService reminderService;
    @Test
    void saveSuccessful() {

        webTestClient.post()
                .uri(uri)
                .bodyValue(testPet)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).save(testPet);
    }

    @Test
    void getAllSuccessful() {
    }

    @Test
    void getSuccessful() {

    }

    @Test
    void getNotFound() {

    }

    @Test
    void updateSuccessful() {
    }

    @Test
    void addReminderSuccessful() {
    }

    @Test
    void addReminderNotFound() {
    }

    @Test
    void deleteByIdSuccessful() {
    }

    @Test
    void deleteByIdNotFound() {
    }

    @Test
    void getPetsByReminderIdSuccessful() {
    }

    @Test
    void getPetsByReminderIdNotFound() {
    }
}