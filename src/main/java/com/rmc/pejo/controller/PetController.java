package com.rmc.pejo.controller;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Pet save(@Valid @RequestBody Pet pet){
        return petService.savePet(pet);
    }
    @GetMapping
    public List<Pet> getPetList(){
        return petService.getPets();
    }
    @PutMapping("/{id}")
    public Pet updatePet(@RequestBody Pet pet, @PathVariable("id") Long id){
        return petService.updatePet(pet, id);
    }
    @DeleteMapping("/{id}")
    public String deletePetById(@PathVariable("id") Long id){
        petService.deletePet(id);
        return "Deleted successfully";
    }
}
