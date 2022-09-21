package com.rmc.pejo.service;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.exceptions.ResourceNotFoundException;
import com.rmc.pejo.repository.PetRepository;
import com.rmc.pejo.repository.ReminderRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service

public class PetService implements PetServiceInterface {

    private final PetRepository petRepository;

    private final ReminderRepository reminderRepository;

    public PetService(PetRepository petRepository, ReminderRepository reminderRepository) {
        this.petRepository = petRepository;
        this.reminderRepository = reminderRepository;
    }

    @Override
    public Pet save(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public List<Pet> getAll() {
        return petRepository.findAll();
    }

    public Optional<Pet> get(Long petId){
        return petRepository.findById(petId);
    }

    @Override
    public Pet update(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public void delete(Long id) {
        petRepository.deleteById(id);
    }
    public Set<Pet> getPetsByReminderId(Long reminderId) {
        return petRepository.findPetsByRemindersId(reminderId);
    }

    public void addReminder(Long id, Reminder reminder){
        Optional<Pet> petOptional = petRepository.findById(id);
        if(petOptional.isPresent()){
            Pet presentPet = petOptional.get();
            List<Reminder> petReminders = presentPet.getReminders();
            petReminders.add(reminder);

            petRepository.save(presentPet);
        } else {
            throw new ResourceNotFoundException("Pet not fund with id: " + id);
        }
    }
}