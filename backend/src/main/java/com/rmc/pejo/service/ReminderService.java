package com.rmc.pejo.service;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.repository.ReminderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ReminderService implements ReminderServiceInterface {
    private final ReminderRepository repository;

    public ReminderService(ReminderRepository repository) {
        this.repository = repository;
    }
    public Reminder save(Reminder reminder){
        return repository.save(reminder);
    }

    public List<Reminder> getAll(){
        return repository.findAll();
    }

    public Optional<Reminder> get(Long reminderId){
        return repository.findById(reminderId);
    }

    public Reminder update(Reminder reminder){
        return repository.save(reminder);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Set<Reminder> getRemindersByPetId(Long petId){
        return repository.findRemindersByPetsId(petId);
    }
    public void addPet(Long id, Pet pet){
        final Optional<Reminder> optionalReminder = repository.findById(id);
        if(optionalReminder.isPresent()){
            System.out.println("adding pet!");
            Reminder reminder = optionalReminder.get();
            System.out.println(reminder);
            Set<Pet> pets = reminder.getPets();
            pets.add(pet);

            System.out.println(pets);
        }
    }
}
