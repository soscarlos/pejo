package com.rmc.pejo.endpoints;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.exceptions.ResourceNotFoundException;
import com.rmc.pejo.service.PetService;
import com.rmc.pejo.service.ReminderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static com.rmc.pejo.entity.PetType.CAT;
import static com.rmc.pejo.entity.SexType.FEMALE;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class PetEndPointTest {
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
    private final Reminder testReminder1 = Reminder.builder()
            .id(testId1)
            .title("Test reminder")
            .description(" Test description")
            .date(testDate)
            .time(LocalTime.now())
            .active(true)
            .build();

    private final Reminder testReminder2 = Reminder.builder()
            .id(testId2)
            .title("Test reminder 2")
            .description(" Test description 2")
            .date(testDate)
            .time(LocalTime.now())
            .active(true)
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
        webTestClient.get()
                .uri(uri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).getAll();
    }

    @Test
    void getSuccessful() {
        String filterUri = uri + "/" + testId1;
        when(petService.get(testId1)).thenReturn(Optional.of(testPet));

        webTestClient.get()
                .uri(filterUri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).get(testId1);
    }

    @Test
    void getNotFound() {
        String filterUri = uri + "/" + testId2;

        webTestClient.get()
                .uri(filterUri)
                .exchange()
                .expectStatus()
                .isNotFound();

        verify(petService).get(testId2);
    }

    @Test
    void updateSuccessful() {
        Pet updatePet = Pet.builder()
                .id(testId1)
                .name("Testy updated")
                .birthDate(testDate)
                .petType(CAT)
                .sexType(FEMALE)
                .build();

        webTestClient.put()
                .uri(uri)
                .bodyValue(updatePet)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).update(updatePet);
    }

    @Test
    void addReminderSuccessful() {
        String filterUri = uri + "/" + testId1;
        when(petService.addReminder(testId1, testReminder1)).thenReturn(Optional.of(testPet));

        webTestClient.put()
                .uri(filterUri)
                .bodyValue(testReminder1)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).addReminder(testId1, testReminder1);
    }

    @Test
    void addReminderNotFound() {
        String filterUri = uri + "/" + testId2;

        webTestClient.put()
                .uri(filterUri)
                .bodyValue(testReminder2)
                .exchange()
                .expectStatus()
                .isNotFound();

        verify(petService).addReminder(testId2, testReminder2);
    }

    @Test
    void deleteByIdSuccessful() {
        String deleteUri = uri + "/" + testId1;
        when(petService.get(testId1)).thenReturn(Optional.of(testPet));

        webTestClient.delete()
                .uri(deleteUri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).delete(testId1);
    }

    @Test
    void deleteByIdNotFound() {
        String deleteUri = uri + "/" + testId2;
        when(petService.get(testId2).isEmpty()).thenThrow(ResourceNotFoundException.class);

        webTestClient.delete()
                .uri(deleteUri)
                .exchange()
                .expectStatus()
                .isNotFound();
    }

    @Test
    void getPetsByReminderIdSuccessful() {
        String filterUri = uri + "/reminder/" + testId1;
        when(reminderService.get(testId1)).thenReturn(Optional.of(testReminder1));

        webTestClient.get()
                .uri(filterUri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(petService).getPetsByReminderId(testId1);
    }

    @Test
    void getPetsByReminderIdNotFound() {
        String filterUri = uri + "/reminder/" + testId2;
        when(reminderService.get(testId2).isEmpty()).thenThrow(ResourceNotFoundException.class);

        webTestClient.get()
                .uri(filterUri)
                .exchange()
                .expectStatus()
                .isNotFound();
    }
}