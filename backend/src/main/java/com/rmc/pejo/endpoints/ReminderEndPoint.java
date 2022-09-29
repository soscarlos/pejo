package com.rmc.pejo.endpoints;

import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.exceptions.ResourceNotFoundException;
import com.rmc.pejo.service.PetService;
import com.rmc.pejo.service.ReminderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("reminders")
@RequiredArgsConstructor
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
    public Reminder get(@PathVariable Long id) {
        return service.get(id).orElseThrow(ResourceNotFoundException::new);
    }

    @GetMapping("/first3ByDate")
    public Set<Reminder> getFirst3AfterToday() {
        return service.getFirst3AfterDate();
    }

    @PutMapping
    public Reminder update(@Valid @RequestBody Reminder reminder) {
        return service.update(reminder);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @GetMapping("pet/{petId}")
    public Set<Reminder> getRemindersByPetId(@PathVariable("petId") Long petId) {
//        TODO: Reminder delegate validation logic to a validation layer
        if (petService.get(petId).isEmpty()) throw new ResourceNotFoundException();
        return service.getRemindersByPetId(petId);
    }
}
