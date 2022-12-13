package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertIterableEquals;

@DataJpaTest
class ReminderRepositoryTest {
    @Autowired
    ReminderRepository reminderRepository;
    @Autowired
    PetRepository petRepository;
    SampleDataProvider dataProvider = new SampleDataProvider();

    LocalDate testDate = dataProvider.getTestDate();

    @Test
    void findRemindersByPetsIdReturnRemindersSetWithPet() {
        Reminder firstReminder = dataProvider.getRemindersList().get(0);
        Reminder savedReminder = reminderRepository.save(firstReminder);
        Pet savedPet = dataProvider.getPets().get(0);
        savedPet.setPetReminders(List.of(savedReminder));
        Pet savedPet1 = petRepository.save(savedPet);

        Set<Reminder> result = reminderRepository.findRemindersByReminderPetsId(savedPet1.getId());

        Set<Reminder> expected = Set.of(savedReminder);
        assertIterableEquals(expected, result);
    }

    @Test
    void findRemindersByNonExistingPetIdReturnEmptySet() {
        Set<Reminder> result = reminderRepository.findRemindersByReminderPetsId(1L);
        Set<Reminder> expected = Collections.emptySet();

        assertIterableEquals(expected, result);
    }

    @Test
    void findFirst3ByDateAfterOrderByDateAscReturnFirst3Reminders() {
        List<Reminder> reminders = reminderRepository.saveAll(dataProvider.getRemindersList());
        List<Reminder> reducedList = reminders
                .stream()
                .sorted(Comparator.comparing(Reminder::getDate))
                .filter(reminder -> reminder.getDate().isBefore(testDate.plusMonths(2)))
                .toList();
        Set<Reminder> expected = new LinkedHashSet<>(reducedList);

        Set<Reminder> result = reminderRepository.findFirst3ByDateAfterOrderByDateAscTimeAsc(testDate);

        assertIterableEquals(expected, result);
    }

    @Test
    void findFirst3ByDateAfterOrderByDateAscIfDatesAreEqualReturnOrderByTime() {
        List<Reminder> reminders = getRemindersWithSameDate();
        List<Reminder> orderedList = reminders
                .stream()
                .sorted(Comparator.comparing(Reminder::getTime))
                .toList();
        Set<Reminder> expected = new LinkedHashSet<>(orderedList.subList(0, 3));

        Set<Reminder> result = reminderRepository.findFirst3ByDateAfterOrderByDateAscTimeAsc(testDate);

        assertIterableEquals(expected, result);
    }

    @Test
    void findFirst3ByDateAfterOrderByDateAscReturnLessThan3RemindersAsc() {
        List<Reminder> reducedRemindersList = reminderRepository.saveAll(dataProvider.getRemindersList().subList(0, 2));
        List<Reminder> orderedList = reducedRemindersList
                .stream()
                .sorted(Comparator.comparing(Reminder::getDate))
                .toList();
        Set<Reminder> expected = new LinkedHashSet<>(orderedList);

        Set<Reminder> result = reminderRepository.findFirst3ByDateAfterOrderByDateAscTimeAsc(testDate);

        assertIterableEquals(expected, result);
    }

    private List<Reminder> getRemindersWithSameDate() {
        List<Reminder> reminders = dataProvider.getRemindersList();
        reminders.forEach(reminder -> {
            reminder.setDate(testDate.plusDays(1));
            reminderRepository.save(reminder);
        });
        return reminderRepository.findAll();
    }
}