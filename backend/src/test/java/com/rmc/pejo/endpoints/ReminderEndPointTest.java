package com.rmc.pejo.endpoints;

import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.service.ReminderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.mockito.Mockito.verify;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class ReminderEndPointTest {
    @Autowired
    WebTestClient webTestClient;

    @MockBean
    ReminderService testService;

    private final String uri = "/reminders";

    private final long testId = 1;

    private final LocalDate testDate = LocalDate.now().plusMonths(1);

    private final LocalTime testTime = LocalTime.now();

    @Test
    void saveSuccesfull() {
        Reminder reminder = Reminder.builder()
                .id(testId)
                .title("reminder 1")
                .description("description 1")
                .date(testDate)
                .time(testTime)
                .active(true)
                .build();

        webTestClient.post()
                .uri(uri)
                .bodyValue(reminder)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(testService).save(reminder);
    }

    @Test
    void getAllSuccesfull() {
        webTestClient.get()
                .uri(uri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(testService).getAll();
    }

    @Test
    void updateSuccesfull() {
        Reminder updatedReminder = Reminder.builder()
                .id(testId)
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

        verify(testService).update(updatedReminder);
    }

    @Test
    void deleteByIdSuccesfull() {
        String deleteUri = uri + "/" + testId;

        webTestClient.delete()
                .uri(deleteUri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(testService).delete(testId);
    }

    @Test
    void getRemindersByPetIdSuccesfull() {
        String filterUri = uri + "/pet/" + testId;

        webTestClient.get()
                .uri(filterUri)
                .exchange()
                .expectStatus()
                .is2xxSuccessful();

        verify(testService).getRemindersByPetId(testId);
    }

    @Test
    void getOneSuccesfull() {

    }

    @Test
    void getFirst3AfterToday() {
    }

    @Test
    void testGetRemindersByPetId() {
    }
}