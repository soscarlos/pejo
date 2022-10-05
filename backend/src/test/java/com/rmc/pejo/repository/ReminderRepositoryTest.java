package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

import static com.rmc.pejo.entity.PetType.CAT;
import static com.rmc.pejo.entity.PetType.DOG;
import static com.rmc.pejo.entity.SexType.FEMALE;
import static com.rmc.pejo.entity.SexType.MALE;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

@DataJpaTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ReminderRepositoryTest {

    LocalDate today = LocalDate.now();
    LocalTime testTime = LocalTime.now();

    @Autowired
    ReminderRepository reminderRepository;
    @Autowired
    PetRepository petRepository;

    List<Reminder> allReminders;

    @BeforeAll
    void addAllData() {
        allReminders = reminderRepository.saveAll(getRemindersList());
    }

    @AfterAll
    void deleteAll() {
        reminderRepository.deleteAll();
        petRepository.deleteAll();
    }

    @Test
    @Order(1)
    void findRemindersByPetsIdReturnRemindersSetWithPet() {
        Optional<Reminder> byId = reminderRepository.findById(1L);

//        reminderRepository.findAllById();

//        List<Pet> pets = getPets();
//        Pet pet1 = pets.get(0);
//        Pet pet2 = pets.get(1);
//        pet1.setPetReminders(List.of(reminder1));
//        pet2.setPetReminders(remindersRest);
//        petRepository.saveAll(List.of(pet2, pet1));
//
//        Set<Reminder> result = reminderRepository.findRemindersByReminderPetsId(1L);
//        Set<Reminder> expected = Set.of(reminder1);

//        result.forEach(reminderResult -> System.out.println("result = " + reminderResult.getTitle()));
//        expected.forEach(reminderExpected -> System.out.println("result = " + reminderExpected.getTitle()));

//        assertIterableEquals(expected, result);
    }

    @Test
    @Order(2)
    void findRemindersByNonExistingPetIdReturnEmptySet() {

        List<Pet> pets = getPets();
        Pet pet1 = pets.get(0);
        pet1.setPetReminders(allReminders);
        petRepository.save(pet1);

        Set<Reminder> result = reminderRepository.findRemindersByReminderPetsId(5L);
        Set<Reminder> expected = Collections.emptySet();

        assertIterableEquals(expected, result);
    }

    @Test
    @Order(3)
    void findFirst3ByDateAfterOrderByDateAscReturnFirst3Reminders() {
        List<Reminder> reducedList = allReminders
                .stream()
                .sorted(Comparator.comparing(Reminder::getDate))
                .filter(reminder -> reminder.getDate().isBefore(today.plusMonths(2)))
                .toList();
        Set<Reminder> expected = new LinkedHashSet<>(reducedList);

        Set<Reminder> result = reminderRepository.findFirst3ByDateAfterOrderByDateAscTimeAsc(today);

        assertIterableEquals(expected, result);
    }

    @Test
    @Order(4)
    void findFirst3ByDateAfterOrderByDateAscReturnLessThan3RemindersAsc() {
        List<Reminder> reminders = allReminders
                .stream()
                .filter(reminder -> reminder.getId() < 3L)
                .toList();
        List<Reminder> orderedList = reminders
                .stream()
                .sorted(Comparator.comparing(Reminder::getDate))
                .toList();
        Set<Reminder> expected = new LinkedHashSet<>(orderedList);

        Set<Reminder> result = reminderRepository.findFirst3ByDateAfterOrderByDateAscTimeAsc(today);

        assertIterableEquals(expected, result);
    }

    @Test
    @Order(5)
    void findFirst3ByDateAfterOrderByDateAscIfDatesAreEqualReturnOrderByTime() {
        allReminders.forEach(reminder -> {
            reminder.setDate(today.plusDays(1));
        });
        List<Reminder> orderedList = allReminders
                .stream()
                .sorted(Comparator.comparing(Reminder::getTime))
                .filter(reminder -> reminder.getId() != 4L)
                .toList();
        Set<Reminder> expected = new LinkedHashSet<>(orderedList);

        Set<Reminder> result = reminderRepository.findFirst3ByDateAfterOrderByDateAscTimeAsc(today);

        assertIterableEquals(expected, result);
    }

    private List<Pet> getPets() {
        Pet testPet1 = Pet.builder()
                .id(1L)
                .name("Testy 1")
                .birthDate(today.minusYears(2))
                .petType(CAT)
                .sexType(FEMALE)
                .build();
        Pet testPet2 = Pet.builder()
                .id(2L)
                .name("Testy 2")
                .birthDate(today.minusYears(1))
                .petType(DOG)
                .sexType(MALE)
                .build();
        Pet testPet3 = Pet.builder()
                .id(3L)
                .name("Testy 3")
                .birthDate(today.minusYears(3))
                .petType(DOG)
                .sexType(FEMALE)
                .build();
        Pet testPet4 = Pet.builder()
                .id(4L)
                .name("Testy 4")
                .birthDate(today.minusMonths(9))
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
                .date(today.plusMonths(1))
                .time(testTime.plusHours(3))
                .active(true)
                .build();
        Reminder testReminder2 = Reminder.builder()
                .id(2L)
                .title("reminder 2")
                .description("description 2")
                .date(today.plusWeeks(1))
                .time(testTime.plusHours(1))
                .active(true)
                .build();
        Reminder testReminder3 = Reminder.builder()
                .id(3L)
                .title("reminder 3")
                .description("description 3")
                .date(today.plusDays(2))
                .time(testTime.plusHours(4))
                .active(true)
                .build();
        Reminder testReminder4 = Reminder.builder()
                .id(4L)
                .title("reminder 4")
                .description("description 4")
                .date(today.plusMonths(2))
                .time(testTime.plusHours(5))
                .active(true)
                .build();
        return List.of(testReminder1, testReminder2, testReminder3, testReminder4);
    }
}