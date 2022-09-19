package com.rmc.pejo.endpoints;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.service.PetService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
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

    @PutMapping
    public Pet update(@Valid @RequestBody Pet pet) {
        return service.update(pet);
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable("id") Long id) {
        service.delete(id);
        return "Deleted successfully";
    }
    @GetMapping("{reminderId}")
    public Set<Pet> getPetsByReminderId(@PathVariable("reminderId") Long reminderId){
       return service.getPetsByReminderId(reminderId);
    }
}
