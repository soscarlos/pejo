package com.rmc.pejo.service;

import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.repository.ReminderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Reminder update(Reminder reminder){
        return repository.save(reminder);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Set<Reminder> getRemindersByPetId(Long petId){
        return repository.findRemindersByPetsId(petId);
    }
}
