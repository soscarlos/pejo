package com.rmc.pejo.controller;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.service.PetService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/pets")
public class PetController {
    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @PostMapping
    public Pet save(@Valid @RequestBody Pet pet) {
        return petService.savePet(pet);
    }

    @GetMapping
    public List<Pet> getAll() {
        return petService.getPets();
    }

    @PutMapping
    public Pet update(@Valid @RequestBody Pet pet) {
        return petService.updatePet(pet);
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        petService.deletePet(id);
        return "Deleted successfully";
    }
}
