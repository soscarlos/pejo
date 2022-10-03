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
        //        TODO: if pet is in reminder we have to remove first that pet for all the reminders. TODO: EXAMPLE
        petRepository.deleteById(id);
    }

    public Set<Pet> getPetsByReminderId(long reminderId) {
        return petRepository.findPetsByPetRemindersId(reminderId);
    }

    public Optional<Pet> addReminder(long id, Reminder reminder) {
        Optional<Pet> petOptional = petRepository.findById(id);
        if (petOptional.isPresent()) {
            Pet presentPet = petOptional.get();
            List<Reminder> petReminders = presentPet.getPetReminders();
            Reminder savedReminder = getReminder(reminder);
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