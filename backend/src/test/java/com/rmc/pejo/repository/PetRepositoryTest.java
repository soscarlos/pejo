package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
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
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PetRepositoryTest {

    LocalDate testDate = LocalDate.now();
    LocalTime testTime = LocalTime.now();

    @Autowired
    PetRepository petRepository;
    @Autowired
    ReminderRepository reminderRepository;

    @BeforeAll
    void addAllData() {
        reminderRepository.saveAll(getRemindersList());
        List<Reminder> remindersSelection1 = reminderRepository.findAllById(List.of(1L, 2L));
        List<Reminder> remindersSelection2 = reminderRepository.findAllById(List.of(3L, 4L));
        Pet pet1 = getPets().get(0);
        Pet pet2 = getPets().get(1);
        pet1.setPetReminders(remindersSelection1);
        pet2.setPetReminders(remindersSelection2);
        petRepository.saveAll(List.of(pet1, pet2));
    }

    @AfterAll
    void deleteAll() {
        petRepository.deleteAll();
        reminderRepository.deleteAll();
    }

    @Test
    void findPetsByRemindersIdReturnPetSetWithReminder() {
        Pet pet1 = petRepository.findById(1L).orElseThrow(RuntimeException::new);
        Set<Pet> expected = Set.of(pet1);

        Set<Pet> result = petRepository.findPetsByPetRemindersId(1L);

        assertIterableEquals(expected, result);
    }

    @Test
    void findPetsByNonExistingRemindersIdReturnEmptySet() {
        Set<Pet> expected = Collections.emptySet();

        Set<Pet> result = petRepository.findPetsByPetRemindersId(5L);

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

        return List.of(testPet1, testPet2);
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