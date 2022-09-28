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
import java.util.*;

import static com.rmc.pejo.entity.PetType.CAT;
import static com.rmc.pejo.entity.PetType.DOG;
import static com.rmc.pejo.entity.SexType.FEMALE;
import static com.rmc.pejo.entity.SexType.MALE;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PetServiceTest {

    private final long testId1 = 1;
    private final long testId2 = 2;
    private final LocalDate testDate = LocalDate.now().minusYears(1);
    private final LocalTime testTime = LocalTime.now();
    private final Pet testPet1 = Pet.builder()
            .id(testId1)
            .name("Testy")
            .birthDate(testDate)
            .petType(CAT)
            .sexType(FEMALE)
            .build();
    private final Pet testPet2 = Pet.builder()
            .id(testId2)
            .name("Testy 2")
            .birthDate(testDate)
            .petType(DOG)
            .sexType(MALE)
            .build();
    private final Reminder testReminder1 = Reminder.builder()
            .id(testId1)
            .title("reminder 1")
            .description("description 1")
            .date(testDate)
            .time(testTime)
            .active(true)
            .build();
    @Mock
    private PetRepository petRepository;
    @Mock
    private ReminderRepository reminderRepository;
    @InjectMocks
    private PetService petService;

    @Test
    void testSaveSuccessful() {
        petService.save(testPet1);

        verify(petRepository).save(testPet1);
    }

    @Test
    void testSaveReturnPet() {
        when(petRepository.save(testPet1)).thenReturn(testPet1);

        Pet saved = petService.save(testPet1);

        assertThat(saved).isNotNull();
    }

    @Test
    void testGetAllSuccessful() {
        petService.getAll();

        verify(petRepository).findAll();
    }

    @Test
    void testGetAllReturnPetList() {
        when(petRepository.findAll()).thenReturn(List.of(testPet1, testPet2));

        List<Pet> allPets = petService.getAll();

        assertThat(allPets).isNotNull();
    }

    @Test
    void testGetAllReturnEmptyList() {
        when(petRepository.findAll()).thenReturn(Collections.emptyList());

        List<Pet> allPets = petService.getAll();

        assertThat(allPets).isEmpty();
    }

    @Test
    void getSuccessful() {
        petService.get(testId1);

        verify(petRepository).findById(testId1);
    }

    @Test
    void getReturnPetIsPresent() {
        when(petRepository.findById(testId1)).thenReturn(Optional.of(testPet1));

        Optional<Pet> pet = petService.get(testId1);

        assertThat(pet).isPresent();
    }

    @Test
    void getReturnOptionalEmpty() {
        when(petRepository.findById(testId2)).thenReturn(Optional.empty());

        Optional<Pet> pet = petService.get(testId2);

        assertThat(pet).isEmpty();
    }

    @Test
    void testUpdateSuccessful() {
        petService.update(testPet1);

        verify(petRepository).save(testPet1);
    }

    @Test
    void testUpdateReturnUpdatedPet() {
        when(petRepository.save(testPet1)).thenReturn(testPet1);
        testPet1.setName("Mogli");
        testPet1.setBirthDate(LocalDate.of(2020, 1, 1));

        Pet updatedPet = petService.update(testPet1);

        assertThat(updatedPet.getName()).isEqualTo("Mogli");
        assertThat(updatedPet.getBirthDate()).isEqualTo("2020-01-01");
    }


    @Test
    void testDeleteSuccessful() {
        petService.delete(testId1);

        verify(petRepository).deleteById(testId1);
    }

    @Test
    void testGetPetsByReminderIdSuccesful() {
        petService.getPetsByReminderId(testId1);

        verify(petRepository).findPetsByPetRemindersId(testId1);
    }

    @Test
    void testGetPetsByReminderReturnPetSet() {
        when(petRepository.findPetsByPetRemindersId(testId1)).thenReturn(Set.of(testPet2, testPet1));

        Set<Pet> petsByReminderId = petService.getPetsByReminderId(testId1);

        assertThat(petsByReminderId).isNotNull();
    }

    @Test
    void testGetPetsByReminderReturnEmptySet() {
        when(petRepository.findPetsByPetRemindersId(testId1)).thenReturn(Collections.emptySet());

        Set<Pet> petsByReminderId = petService.getPetsByReminderId(testId1);

        assertThat(petsByReminderId).isEmpty();
    }

    @Test
    void testAddReminderReturnPetIsPresent() {
        when(petRepository.findById(testId1)).thenReturn(Optional.of(testPet1));
        testPet1.setPetReminders(new ArrayList<>());
        when(petRepository.save(testPet1)).thenReturn(testPet1);

        Optional<Pet> pet = petService.addReminder(testId1, testReminder1);

        assertThat(pet).isPresent();
    }

    @Test
    void testAddReminderReturnOptionalEmpty() {
        when(petRepository.findById(testId1)).thenReturn(Optional.empty());

        Optional<Pet> pet = petService.addReminder(testId1, testReminder1);

        assertThat(pet).isEmpty();
    }

    @Test
    void testAddReminderInsertReminderInPetsRemindersList() {
        long reminder1Id = testReminder1.getId();
        testPet1.setPetReminders(new ArrayList<>());
        when(petRepository.findById(testId1)).thenReturn(Optional.of(testPet1));
        when(petRepository.save(testPet1)).thenReturn(testPet1);
        when(reminderRepository.findById(reminder1Id)).thenReturn(Optional.of(testReminder1));

        Optional<Pet> pet = petService.addReminder(testId1, testReminder1);

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