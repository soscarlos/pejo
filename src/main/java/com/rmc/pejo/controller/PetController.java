package com.rmc.pejo.controller;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class PetController {
    @Autowired
    private PetService petService;

    @PostMapping("/pets")
    public Pet savePet(@Valid @RequestBody Pet pet){
        return petService.savePet(pet);
    }
    @GetMapping("/pets")
    public List<Pet> getPetList(){
        return petService.getPets();
    }
    @PutMapping("/pets/{id}")
    public Pet updatePet(@RequestBody Pet pet, @PathVariable("id") Long id){
        return petService.updatePet(pet, id);
    }
    @DeleteMapping("/pets/{id}")
    public String deletePetById(@PathVariable("id") Long id){
        petService.deletePet(id);
        return "Deleted successfully";
    }
}
