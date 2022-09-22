package com.rmc.pejo.endpoints;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.service.ReminderService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin
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

    @GetMapping("/first3ByDate")
    public Set<Reminder> getFirst3AfterToday(){
        return service.getFirst3AfterDate();
    }
    @PutMapping
    public Reminder update(@Valid @RequestBody Reminder reminder){
        return service.update(reminder);
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
