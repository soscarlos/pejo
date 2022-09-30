package com.rmc.pejo.service;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.repository.PetRepository;
import com.rmc.pejo.repository.ReminderRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.rmc.pejo.entity.PetType.CAT;
import static com.rmc.pejo.entity.SexType.FEMALE;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PetServiceTest {

    long testId1 = 1;
    LocalDate testDate = LocalDate.now().minusYears(1);
    LocalTime testTime = LocalTime.now();
    Pet testPet1 = Pet.builder()
            .id(testId1)
            .name("Testy")
            .birthDate(testDate)
            .petType(CAT)
            .sexType(FEMALE)
            .petReminders(new ArrayList<>())
            .build();
    Reminder testReminder1 = Reminder.builder()
            .id(testId1)
            .title("reminder 1")
            .description("description 1")
            .date(testDate)
            .time(testTime)
            .active(true)
            .build();
    @Mock
    PetRepository petRepository;
    @Mock
    ReminderRepository reminderRepository;
    @InjectMocks
    PetService petService;

    @Test
    void testSave() {
        petService.save(testPet1);

        verify(petRepository).save(testPet1);
    }

    @Test
    void testGetAllCallRepositoryMethod() {
        petService.getAll();

        verify(petRepository).findAll();
    }

    @Test
    void testGetCallRepositoryMethod() {
        petService.get(testId1);

        verify(petRepository).findById(testId1);
    }

    @Test
    void testUpdateCallRepositoryMethod() {
        petService.update(testPet1);

        verify(petRepository).save(testPet1);
    }

    @Test
    void testDeleteCallRepositoryMethod() {
        petService.delete(testId1);

        verify(petRepository).deleteById(testId1);
    }

    @Test
    void testGetPetsByReminderIdCallRepositoryMethod() {
        petService.getPetsByReminderId(testId1);

        verify(petRepository).findPetsByPetRemindersId(testId1);
    }

    @Test
    void testAddReminderReturnPetIsPresent() {
        when(petRepository.findById(testId1)).thenReturn(Optional.of(testPet1));
        when(petRepository.save(testPet1)).thenReturn(testPet1);

        Optional<Pet> pet = petService.addReminder(testId1, testReminder1);

        assertThat(pet).isPresent();
    }

    @Test
    void testAddReminderReturnOptionalEmpty() {
        when(petRepository.findById(testId1)).thenReturn(Optional.empty());

        Optional<Pet> pet = petService.addReminder(testId1, testReminder1);

        verify(petRepository, never()).save(any(Pet.class));
        assertThat(pet).isEmpty();
    }

    @Test
    void testAddReminderInsertReminderInPetsRemindersList() {
        long reminder1Id = testReminder1.getId();
        when(petRepository.findById(testId1)).thenReturn(Optional.of(testPet1));
        when(petRepository.save(testPet1)).thenReturn(testPet1);
        when(reminderRepository.findById(reminder1Id)).thenReturn(Optional.of(testReminder1));

        Optional<Pet> pet = petService.addReminder(testId1, testReminder1);

        assertThat(pet).isPresent();
        List<Reminder> petReminders = pet.get().getPetReminders();
        assertThat(petReminders).contains(testReminder1);
    }

    @Test
    void testAddReminderSaveNewReminder() {
        long reminder1Id = testReminder1.getId();
        testPet1.setPetReminders(new ArrayList<>());
        when(petRepository.findById(testId1)).thenReturn(Optional.of(testPet1));
        when(petRepository.save(testPet1)).thenReturn(testPet1);
        when(reminderRepository.findById(reminder1Id)).thenReturn(Optional.empty());

        petService.addReminder(testId1, testReminder1);

        verify(reminderRepository).save(testReminder1);
    }
}