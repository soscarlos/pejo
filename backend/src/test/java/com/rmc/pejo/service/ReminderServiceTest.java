package com.rmc.pejo.service;

import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.repository.ReminderRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReminderServiceTest {
    private final long testId1 = 1;
    private final long testId2 = 2;
    private final LocalDate testDate = LocalDate.now().plusMonths(1);
    private final LocalTime testTime = LocalTime.now();
    private final Reminder testReminder1 = Reminder.builder()
            .id(testId1)
            .title("reminder 1")
            .description("description 1")
            .date(testDate)
            .time(testTime)
            .active(true)
            .build();
    @Mock
    private ReminderRepository reminderRepository;
    @InjectMocks
    private ReminderService service;

    @Test
    void testSaveCallRepositoryMethod() {
        service.save(testReminder1);

        verify(reminderRepository).save(testReminder1);
    }
    @Test
    void testSaveReturnReminder() {
        when(reminderRepository.save(testReminder1)).thenReturn(testReminder1);

        Reminder saved = service.save(testReminder1);

        assertThat(saved).isNotNull();
    }

    @Test
    void testGetAllSuccessful() {

    }

    @Test
    void get() {
    }

    @Test
    void getFirst3AfterDate() {
    }

    @Test
    void update() {
    }

    @Test
    void delete() {
    }

    @Test
    void getRemindersByPetId() {
    }
}