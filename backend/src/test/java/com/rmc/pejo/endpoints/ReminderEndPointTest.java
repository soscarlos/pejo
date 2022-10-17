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

import static com.rmc.pejo.entity.PetType.DOG;
import static com.rmc.pejo.entity.SexType.FEMALE;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class ReminderEndPointTest {
    String uri = "/reminders";
    long testId1 = 1;
    long testId2 = 2;
    LocalDate testDate = LocalDate.now().plusMonths(1);
    LocalTime testTime = LocalTime.now();
    Reminder testReminder = Reminder.builder()
            .id(testId1)
            .title("reminder 1")
            .description("description 1")
            .date(testDate)
            .time(testTime)
            .active(true)
            .build();
    @Autowired
    WebTestClient webTestClient;
    @MockBean
    ReminderService reminderService;
    @MockBean
    PetService petService;

    @Test
    void saveSuccesfull() {
        webTestClient.post()
                .uri(uri)
                .bodyValue(testReminder)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(reminderService).save(testReminder);
    }

    @Test
    void getAllSuccesfull() {
        webTestClient.get()
                .uri(uri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(reminderService).getAll();
    }

    @Test
    void updateSuccesfull() {
        Reminder updatedReminder = Reminder.builder()
                .id(testId1)
                .title("updated reminder 1")
                .description(" updated description 1")
                .date(testDate)
                .time(testTime)
                .active(true)
                .build();

        webTestClient.put()
                .uri(uri)
                .bodyValue(updatedReminder)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(reminderService).update(updatedReminder);
    }

    @Test
    void deleteByIdSuccesfull() {
        String deleteUri = uri + "/" + testId1;
        when(reminderService.get(testId1)).thenReturn(Optional.of(testReminder));

        webTestClient.delete()
                .uri(deleteUri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(reminderService).delete(testId1);
    }

    @Test
    void getRemindersByPetIdSuccesfull() {
        String filterUri = uri + "/pet/" + testId1;
        Pet pet = Pet.builder()
                .id(testId1)
                .name("Testy")
                .birthDate(LocalDate.of(2020, 2, 2))
                .petType(DOG)
                .sexType(FEMALE)
                .build();

        when(petService.get(testId1)).thenReturn(Optional.of(pet));

        webTestClient.get()
                .uri(filterUri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(reminderService).getRemindersByPetId(testId1);
    }

    @Test
    void getRemindersByPetIdNotFound() {
        String filterUri = uri + "/pet/" + testId2;

        when(petService.get(testId2).isEmpty()).thenThrow(ResourceNotFoundException.class);

        webTestClient.get()
                .uri(filterUri)
                .exchange()
                .expectStatus()
                .isNotFound();
    }

    @Test
    void getSuccesfull() {
        String filterUri = uri + "/" + testId1;
        when(reminderService.get(testId1)).thenReturn(Optional.of(testReminder));

        webTestClient.get()
                .uri(filterUri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(reminderService).get(testId1);
    }
    @Test
    void getNotFound() {
        String filterUri = uri + "/" + testId2;

        webTestClient.get()
                .uri(filterUri)
                .exchange()
                .expectStatus()
                .isNotFound();

        verify(reminderService).get(testId2);
    }

    @Test
    void getFirst3AfterToday() {
        String filterUri = uri + "/first3AfterToday";

        webTestClient.get()
                .uri(filterUri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(reminderService).getFirst3AfterDate();
    }
}