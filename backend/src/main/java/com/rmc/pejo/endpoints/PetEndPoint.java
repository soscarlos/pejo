package com.rmc.pejo.endpoints;

import com.rmc.pejo.entity.Pet;
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
@RequestMapping("pets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PetEndPoint {
    private final PetService service;
    private final ReminderService reminderService;

    @PostMapping
    public Pet save(@Valid @RequestBody Pet pet) {return service.save(pet);}

    @GetMapping
    public List<Pet> getAll() {
        return service.getAll();
    }

    @GetMapping("{id}")
    public Pet get(@PathVariable long id) {
        return service.get(id).orElseThrow(ResourceNotFoundException::new);
    }

    @PutMapping
    public Pet update(@Valid @RequestBody Pet pet) {
        return service.update(pet);
    }

    @PutMapping("{id}")
    public Pet addReminder(@PathVariable long id, @RequestBody Reminder reminder) {
        return service.addReminder(id, reminder).orElseThrow(ResourceNotFoundException::new);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable long id) {
        service.delete(id);
    }

    @GetMapping("reminder/{reminderId}")
    public Set<Pet> getPetsByReminderId(@PathVariable long reminderId) {
        return service.getPetsByReminderId(reminderId);
    }
}
