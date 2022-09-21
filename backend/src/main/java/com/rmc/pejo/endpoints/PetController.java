package com.rmc.pejo.endpoints;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.service.PetService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("pets")
public class PetController {
    private final PetService service;

    public PetController(PetService petService) {
        this.service = petService;
    }

    @PostMapping
    public Pet save(@Valid @RequestBody Pet pet) {
        return service.save(pet);
    }

    @GetMapping
    public List<Pet> getAll() {
        return service.getAll();
    }

    @GetMapping("{id}")
    public Optional<Pet> get(@PathVariable Long id){
        return service.get(id);
    }


    @PutMapping
    public Pet update(@Valid @RequestBody Pet pet) {
        return service.update(pet);
    }

    @PutMapping("{id}")
    public void addPet(@PathVariable Long id, @RequestBody Reminder reminder){
        service.addReminder(id, reminder);
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable("id") Long id) {
        service.delete(id);
        return "Deleted successfully";
    }
    @GetMapping("reminder/{reminderId}")
    public Set<Pet> getPetsByReminderId(@PathVariable("reminderId") Long reminderId){
       return service.getPetsByReminderId(reminderId);
    }

}
