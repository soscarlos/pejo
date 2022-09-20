package com.rmc.pejo.endpoints;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.service.ReminderService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("reminders")
public class ReminderEndPoint {
    private final ReminderService service;

    public ReminderEndPoint(ReminderService service) {
        this.service = service;
    }

    @PostMapping
    public Reminder save(@Valid @RequestBody Reminder reminder){
        return service.save(reminder);
    }
    @GetMapping
    public List<Reminder> getAll(){
        return service.getAll();
    }

    @GetMapping("{id}")
    public Optional<Reminder> get(@PathVariable Long id){
        return service.get(id);
    }
    @PutMapping
    public Reminder update(@Valid @RequestBody Reminder reminder){
        return service.update(reminder);
    }
    @PutMapping("{id}")
    public void addPet(@PathVariable Long id, @RequestBody Pet pet){
        service.addPet(id, pet);
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable("id") Long id){
        service.delete(id);
        return "Deleted successfully";
    }
    @GetMapping("pet/{petId}")
    public Set<Reminder> getRemindersByPetId(@PathVariable("petId") Long petId){
        return service.getRemindersByPetId(petId);
    }
}
