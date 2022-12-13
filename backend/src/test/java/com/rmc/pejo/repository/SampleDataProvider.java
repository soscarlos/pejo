package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static com.rmc.pejo.entity.PetType.CAT;
import static com.rmc.pejo.entity.PetType.DOG;
import static com.rmc.pejo.entity.SexType.FEMALE;
import static com.rmc.pejo.entity.SexType.MALE;

public class SampleDataProvider {
    private final LocalDate testDate = LocalDate.of(2022, 10, 10);

    private final LocalTime testTime = LocalTime.of(9, 30, 0);

    public LocalDate getTestDate() {
        return testDate;
    }

    public List<Pet> getPets() {
        Pet testPet1 = Pet.builder()
                .id(1L)
                .name("Testy 1")
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

    public List<Reminder> getRemindersList() {
        Reminder testReminder1 = Reminder.builder()
                .id(1L)
                .title("reminder 1")
                .description("description 1")
                .date(testDate.plusMonths(1))
                .time(testTime.plusHours(3))
                .active(true)
                .build();
        Reminder testReminder2 = Reminder.builder()
                .id(2L)
                .title("reminder 2")
                .description("description 2")
                .date(testDate.plusWeeks(1))
                .time(testTime.plusHours(1))
                .active(true)
                .build();
        Reminder testReminder3 = Reminder.builder()
                .id(3L)
                .title("reminder 3")
                .description("description 3")
                .date(testDate.plusDays(2))
                .time(testTime.plusHours(4))
                .active(true)
                .build();
        Reminder testReminder4 = Reminder.builder()
                .id(4L)
                .title("reminder 4")
                .description("description 4")
                .date(testDate.plusMonths(2))
                .time(testTime.plusHours(5))
                .active(true)
                .build();
        return List.of(testReminder1, testReminder2, testReminder3, testReminder4);
    }
}
