package com.rmc.pejo.service;

import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.repository.ReminderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ReminderService implements ReminderServiceInterface {
    private final ReminderRepository reminderRepository;

    public ReminderService(ReminderRepository repository) {
        this.reminderRepository = repository;
    }

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
//        TODO: if reminder is in pet we have to remove first that reminder for all the pets.
        reminderRepository.deleteById(id);
    }

    public Set<Reminder> getRemindersByPetId(long petId) {
        return reminderRepository.findRemindersByReminderPetsId(petId);
    }
}