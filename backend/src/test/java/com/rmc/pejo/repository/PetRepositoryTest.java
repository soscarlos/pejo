package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static com.rmc.pejo.entity.PetType.CAT;
import static com.rmc.pejo.entity.PetType.DOG;
import static com.rmc.pejo.entity.SexType.FEMALE;
import static com.rmc.pejo.entity.SexType.MALE;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

@DataJpaTest
class PetRepositoryTest {

    private final LocalDate testDate = LocalDate.now();
    private final LocalTime testTime = LocalTime.now();

    @Autowired
    private PetRepository petRepository;
    @Autowired
    private ReminderRepository reminderRepository;

    @AfterEach
    void deleteAll() {
        petRepository.deleteAll();
        reminderRepository.deleteAll();
    }

    @Test
    void findPetsByRemindersIdReturnPetSetWithReminder() {
        List<Reminder> remindersSelection1 = getRemindersList()
                .stream()
                .filter(reminder -> reminder.getId() < 3L)
                .toList();
        List<Reminder> remindersSelection2 = getRemindersList()
                .stream()
                .filter(reminder -> reminder.getId() > 2L)
                .toList();
        reminderRepository.saveAll(getRemindersList());
        List<Pet> pets = getPets();
        Pet pet1 = pets.get(0);
        Pet pet2 = pets.get(1);
        pet1.setPetReminders(remindersSelection1);
        pet2.setPetReminders(remindersSelection2);
        petRepository.saveAll(List.of(pet1, pet2));

        Set<Pet> result = petRepository.findPetsByPetRemindersId(1L);
        Set<Pet> expected = Set.of(pet1);

        assertIterableEquals(expected, result);
    }
    @Test
    void findPetsByNonExistingRemindersIdReturnEmptySet() {
        reminderRepository.saveAll(getRemindersList());
        List<Pet> pets = getPets();
        Pet pet1 = pets.get(0);
        Pet pet2 = pets.get(1);
        pet1.setPetReminders(getRemindersList());
        pet2.setPetReminders(getRemindersList());
        petRepository.saveAll(List.of(pet1, pet2));

        Set<Pet> result = petRepository.findPetsByPetRemindersId(5L);
        Set<Pet> expected = Collections.emptySet();

        assertIterableEquals(expected, result);
    }

    private List<Pet> getPets() {
        Pet testPet1 = Pet.builder()
                .id(1L)
                .name("Testy")
                .birthDate(testDate.minusYears(2))
                .petType(CAT)
                .sexType(FEMALE)
                .build();
        Pet testPet2 = Pet.builder()
                .id(2L)
                .name("Testy 2")
                .birthDate(testDate.minusYears(1))
                .petType(DOG)
                .sexType(MALE)
                .build();
        Pet testPet3 = Pet.builder()
                .id(3L)
                .name("Testy 3")
                .birthDate(testDate.minusYears(3))
                .petType(DOG)
                .sexType(FEMALE)
                .build();
        Pet testPet4 = Pet.builder()
                .id(4L)
                .name("Testy 4")
                .birthDate(testDate.minusMonths(9))
                .petType(CAT)
                .sexType(MALE)
                .build();

        return List.of(testPet1, testPet2, testPet3, testPet4);
    }

    private List<Reminder> getRemindersList() {
        Reminder testReminder1 = Reminder.builder()
                .id(1L)
                .title("reminder 1")
                .description("description 1")
                .date(testDate.plusMonths(1))
                .time(testTime)
                .active(true)
                .build();
        Reminder testReminder2 = Reminder.builder()
                .id(2L)
                .title("reminder 2")
                .description("description 2")
                .date(testDate.plusWeeks(1))
                .time(testTime)
                .active(true)
                .build();
        Reminder testReminder3 = Reminder.builder()
                .id(3L)
                .title("reminder 3")
                .description("description 3")
                .date(testDate.plusDays(2))
                .time(testTime)
                .active(true)
                .build();
        Reminder testReminder4 = Reminder.builder()
                .id(4L)
                .title("reminder 4")
                .description("description 4")
                .date(testDate.plusMonths(2))
                .time(testTime)
                .active(true)
                .build();
        return List.of(testReminder1, testReminder2, testReminder3, testReminder4);
    }
}