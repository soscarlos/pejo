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
import java.util.*;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReminderServiceTest {
    private final long testId1 = 1;
    private final long testId2 = 2;
    private final LocalDate testDate = LocalDate.now().plusDays(1);
    private final LocalTime testTime = LocalTime.now();
    private final Reminder testReminder1 = Reminder.builder()
            .id(testId1)
            .title("reminder 1")
            .description("description 1")
            .date(testDate)
            .time(testTime)
            .active(true)
            .build();
    private final Reminder testReminder2 = Reminder.builder()
            .id(testId2)
            .title("reminder 2")
            .description("description 2")
            .date(testDate.plusWeeks(1))
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
    void testGetAllCallRepositoryMethod() {
        service.getAll();

        verify(reminderRepository).findAll();
    }
    @Test
    void testGetAllReturnRemindersList() {
        when(reminderRepository.findAll()).thenReturn(List.of(testReminder1, testReminder2));

        List<Reminder> allReminders = service.getAll();

        assertThat(allReminders).isNotEmpty();
    }
    @Test
    void testGetAllReturnEmptyList() {
        when(reminderRepository.findAll()).thenReturn(Collections.emptyList());

        List<Reminder> allReminders = service.getAll();

        assertThat(allReminders).isEmpty();
    }

    @Test
    void testGetCallRepositoryMethod() {
        service.get(testId1);

        verify(reminderRepository).findById(testId1);
    }
    @Test
    void testGetReturnPresentReminder() {
        when(reminderRepository.findById(testId1)).thenReturn(Optional.of(testReminder1));

        Optional<Reminder> reminder = service.get(testId1);

        assertThat(reminder).isPresent();
    }
    @Test
    void testGetReturnOptionalEmpty() {
        when(reminderRepository.findById(testId2)).thenReturn(Optional.empty());

        Optional<Reminder> reminder = service.get(testId2);

        assertThat(reminder).isEmpty();
    }

    @Test
    void testGetFirst3AfterDateCallRepositoryMethod() {
        service.getFirst3AfterDate();
        LocalDate today = LocalDate.now();

        verify(reminderRepository).findFirst3ByDateAfterOrderByDateAsc(today);
    }
    @Test
    void testGetFirst3AfterDateReturn3Elements() {
        LocalDate today = LocalDate.now();
        Set<Reminder> reminderFiltered = getReminders().stream()
                .filter(reminder -> reminder.getDate().isBefore(today.plusMonths(1)))
                .collect(Collectors.toSet());
        when(reminderRepository.findFirst3ByDateAfterOrderByDateAsc(today)).thenReturn(reminderFiltered);

        Set<Reminder> first3AfterDate = service.getFirst3AfterDate();

        assertThat(first3AfterDate.size()).isEqualTo(3);
    }
    @Test
    void testGetFirst3AfterDateReturnLessThan3Elements() {
        LocalDate today = LocalDate.now();
        Set<Reminder> reminderFiltered = getReminders().stream()
                .filter(reminder -> reminder.getDate().isBefore(today.plusWeeks(1)))
                .collect(Collectors.toSet());
        when(reminderRepository.findFirst3ByDateAfterOrderByDateAsc(today)).thenReturn(reminderFiltered);

        Set<Reminder> first3AfterDate = service.getFirst3AfterDate();

        assertThat(first3AfterDate.size()).isLessThan(3);
    }

//    TODO: do additional tests for update, delete and find by pet id
    @Test
    void testUpdateCallRepositoryMethod() {
        service.update(testReminder1);

        verify(reminderRepository).save(testReminder1);
    }

    @Test
    void testDeleteCallRepositoryMethod() {
        service.delete(testId1);

        verify(reminderRepository).deleteById(testId1);
    }

    @Test
    void testGetRemindersByPetIdCallRepositoryMethod() {
        service.getRemindersByPetId(testId1);

        verify(reminderRepository).findRemindersByReminderPetsId(testId1);
    }

    private Set<Reminder> getReminders(){
        Reminder testReminder3 = Reminder.builder()
                .id(3L)
                .title("reminder 3")
                .description("description 3")
                .date(testDate.plusMonths(1))
                .time(testTime)
                .active(true)
                .build();
        Reminder testReminder4 = Reminder.builder()
                .id(4L)
                .title("reminder 4")
                .description("description 4")
                .date(testDate.plusDays(4))
                .time(testTime)
                .active(true)
                .build();
        return Set.of(testReminder1, testReminder2, testReminder3, testReminder4);
    }
}