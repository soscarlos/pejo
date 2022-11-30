package com.rmc.pejo.endpoints;

import com.rmc.pejo.endpoints.request.ReminderTimeRequest;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.exceptions.ResourceNotFoundException;
import com.rmc.pejo.service.PetService;
import com.rmc.pejo.service.ReminderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("reminders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReminderEndPoint {
    private final ReminderService service;

    private final PetService petService;

    @PostMapping
    public Reminder save(@Valid @RequestBody Reminder reminder) {
        return service.save(reminder);
    }

    @GetMapping
    public List<Reminder> getAll() {
        return service.getAll();
    }

    @GetMapping("{id}")
    public Reminder get(@PathVariable long id) {
        return service.get(id).orElseThrow(ResourceNotFoundException::new);
    }

    @GetMapping("/first3AfterToday")
    public Set<Reminder> getFirst3AfterToday() {
        return service.getFirst3AfterDate();
    }

    @PutMapping
    public Reminder update(@Valid @RequestBody Reminder reminder) {
        return service.update(reminder);
    }

    @PatchMapping("{id}")
    public Reminder setReminderTime(@PathVariable long id, @RequestBody ReminderTimeRequest reminderTimeRequest){
        return service.setReminderTime(id, reminderTimeRequest).orElseThrow(ResourceNotFoundException::new);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable("id") long id) {
        service.delete(id);
    }

    @GetMapping("pet/{petId}")
    public Set<Reminder> getRemindersByPetId(@PathVariable("petId") long petId) {
        return service.getRemindersByPetId(petId);
    }
}
