package com.rmc.pejo.service;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.repository.PetRepository;
import com.rmc.pejo.repository.ReminderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PetService implements PetServiceInterface {

    private final PetRepository petRepository;
    private final ReminderRepository reminderRepository;

    @Override
    public Pet save(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public List<Pet> getAll() {
        return petRepository.findAll();
    }

    public Optional<Pet> get(long petId) {
        return petRepository.findById(petId);
    }

    @Override
    public Pet update(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public void delete(long id) {
        Set<Reminder> remindersByPetsId = reminderRepository.findRemindersByReminderPetsId(id);
        removePetFromReminder(remindersByPetsId, id);
        petRepository.deleteById(id);
        removeReminder(remindersByPetsId);
    }

    private void removeReminder(Set<Reminder> remindersByPetsId) {
        remindersByPetsId.forEach(reminder -> {
            int amountOfPets = reminder.getReminderPets().size();
            if (amountOfPets == 0) {
                reminderRepository.delete(reminder);
            }
        });
    }

    private void removePetFromReminder(Set<Reminder> reminders, long id) {
        reminders.forEach(reminder -> {
            List<Pet> reminderPets = reminder.getReminderPets();
            reminderPets.removeIf(pet -> pet.getId() == id);
            reminderRepository.save(reminder);
        });
    }

    public Set<Pet> getPetsByReminderId(long reminderId) {
        return petRepository.findPetsByPetRemindersId(reminderId);
    }

    public Optional<Pet> addReminder(long id, Reminder reminder) {
        System.out.println(reminder.getId());
        Optional<Pet> petOptional = petRepository.findById(id);
        if (petOptional.isPresent()) {
            Pet presentPet = petOptional.get();
            List<Reminder> petReminders = presentPet.getPetReminders();
            Reminder savedReminder = getReminder(reminder);
            System.out.println(savedReminder.getId());
            petReminders.add(savedReminder);
            Pet savedPet = petRepository.save(presentPet);
            return Optional.of(savedPet);
        } else {
            return Optional.empty();
        }
    }

    private Reminder getReminder(Reminder reminder) {
        long reminderId = reminder.getId();
        Optional<Reminder> optionalReminder = reminderRepository.findById(reminderId);
        return optionalReminder.isEmpty() ? reminderRepository.save(reminder) : optionalReminder.get();
    }
}