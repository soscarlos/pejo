package com.rmc.pejo.service;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.repository.PetRepository;
import com.rmc.pejo.repository.ReminderRepository;
import com.rmc.pejo.service.clock.DateTimeProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Set;

import static com.rmc.pejo.entity.PetType.CAT;
import static com.rmc.pejo.entity.SexType.FEMALE;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReminderServiceTest {
    long testId1 = 1;
    DateTimeProvider provider = new DateTimeProvider();
    LocalDate testDate = provider.getLocalDate();
    Pet testPet1 = Pet.builder()
            .id(testId1)
            .name("Testy")
            .birthDate(testDate)
            .petType(CAT)
            .sexType(FEMALE)
            .petReminders(new ArrayList<>())
            .build();
    LocalTime testTime = provider.getLocalTime();

    ZonedDateTime NOW_FIXED = provider.getZonedDateTime();
    Reminder testReminder1 = Reminder.builder()
            .id(testId1)
            .title("reminder 1")
            .description("description 1")
            .date(testDate)
            .time(testTime)
            .active(true)
            .build();
    @Mock
    ReminderRepository reminderRepository;
    @Mock
    PetRepository petRepository;
    @Mock
    Clock clock;
    @InjectMocks
    ReminderService service;

    @Test
    void testSaveCallRepositoryMethod() {
        service.save(testReminder1);

        verify(reminderRepository).save(testReminder1);
    }

    @Test
    void testGetAllCallRepositoryMethod() {
        service.getAll();

        verify(reminderRepository).findAll();
    }

    @Test
    void testGetCallRepositoryMethod() {
        service.get(testId1);

        verify(reminderRepository).findById(testId1);
    }

    @Test
    void testGetFirst3AfterDateCallRepositoryMethod() {
        when(clock.getZone()).thenReturn(NOW_FIXED.getZone());
        when(clock.instant()).thenReturn(NOW_FIXED.toInstant());

        service.getFirst3AfterDate();

        verify(reminderRepository).findFirst3ByDateAfterOrderByDateAscTimeAsc(testDate);
    }

    @Test
    void testUpdateCallRepositoryMethod() {
        service.update(testReminder1);

        verify(reminderRepository).save(testReminder1);
    }

    @Test
    void testDeleteCallRepositoryMethods() {
        when(petRepository.findPetsByPetRemindersId(testId1)).thenReturn(Set.of(testPet1));

        service.delete(testId1);

        verify(petRepository).save(any(Pet.class));
        verify(reminderRepository).deleteById(testId1);
    }

    @Test
    void testGetRemindersByPetIdCallRepositoryMethod() {
        service.getRemindersByPetId(testId1);

        verify(reminderRepository).findRemindersByReminderPetsId(testId1);
    }
}