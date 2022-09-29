package com.rmc.pejo.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalTime;

@DataJpaTest
class ReminderRepositoryTest {

    private final LocalDate testDate = LocalDate.now();
    private final LocalTime testTime = LocalTime.now();

    @Autowired
    private ReminderRepository reminderRepository;
    @Autowired
    private PetRepository petRepository;

    @Test
    void findRemindersByPetsId() {
    }

    @Test
    void findFirst3ByDateAfterOrderByDateAsc() {
    }
}