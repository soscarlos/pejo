package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Collections;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertIterableEquals;

@DataJpaTest
class PetRepositoryTest {

    @Autowired
    PetRepository petRepository;
    @Autowired
    ReminderRepository reminderRepository;
    SampleDataProvider dataProvider = new SampleDataProvider();

    @Test
    void findPetsByRemindersIdReturnPetSetWithReminder() {
        Pet pet = dataProvider.getPets().get(0);
        Reminder savedReminder = reminderRepository.save(dataProvider.getRemindersList().get(0));
        pet.setPetReminders(List.of(savedReminder));
        Pet savedPet = petRepository.save(pet);

        Set<Pet> expected = Set.of(savedPet);

        Set<Pet> result = petRepository.findPetsByPetRemindersId(savedReminder.getId());

        assertIterableEquals(expected, result);
    }

    @Test
    void findPetsByNonExistingRemindersIdReturnEmptySet() {
        Set<Pet> expected = Collections.emptySet();

        Set<Pet> result = petRepository.findPetsByPetRemindersId(1L);

        assertIterableEquals(expected, result);
    }
}