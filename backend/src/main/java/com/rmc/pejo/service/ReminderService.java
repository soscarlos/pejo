package com.rmc.pejo.service;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.exceptions.ResourceNotFoundException;
import com.rmc.pejo.repository.PetRepository;
import com.rmc.pejo.repository.ReminderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ReminderService implements ReminderServiceInterface {
    private final ReminderRepository reminderRepository;

    public ReminderService(ReminderRepository repository) {
        this.reminderRepository = repository;
    }
    public Reminder save(Reminder reminder){
        return reminderRepository.save(reminder);
    }

    public List<Reminder> getAll(){
        return reminderRepository.findAll();
    }

    public Optional<Reminder> get(Long reminderId){
        return reminderRepository.findById(reminderId);
    }

    public Reminder update(Reminder reminder){
        return reminderRepository.save(reminder);
    }

    public void delete(Long id){
        reminderRepository.deleteById(id);
    }

    public Set<Reminder> getRemindersByPetId(Long petId){
        return reminderRepository.findRemindersByPetsId(petId);
    }
}
