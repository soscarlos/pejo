package com.rmc.pejo.service;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.repository.PetRepository;
import com.rmc.pejo.repository.ReminderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ReminderService implements ReminderServiceInterface {
    private final ReminderRepository reminderRepository;
    private final PetRepository petRepository;

    public Reminder save(Reminder reminder) {
        return reminderRepository.save(reminder);
    }

    public List<Reminder> getAll() {
        return reminderRepository.findAll();
    }

    public Optional<Reminder> get(long id) {
        return reminderRepository.findById(id);
    }

    public Set<Reminder> getFirst3AfterDate() {
        LocalDate now = LocalDate.now();
        return reminderRepository.findFirst3ByDateAfterOrderByDateAsc(now);
    }

    public Reminder update(Reminder reminder) {
        return reminderRepository.save(reminder);
    }

    public void delete(long id) {
        Set<Pet> pets = petRepository.findPetsByPetRemindersId(id);
        removeReminderFromPets(pets, id);
        reminderRepository.deleteById(id);
    }

    private void removeReminderFromPets(Set<Pet> pets, long id){
        pets.forEach(pet -> {
            List<Reminder> petReminders = pet.getPetReminders();
            petReminders.removeIf(reminder -> reminder.getId() == id);
            petRepository.save(pet);
        });
    }

    public Set<Reminder> getRemindersByPetId(long petId) {
        return reminderRepository.findRemindersByReminderPetsId(petId);
    }
}