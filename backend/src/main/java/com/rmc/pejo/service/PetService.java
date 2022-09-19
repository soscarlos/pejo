package com.rmc.pejo.service;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service

public class PetService implements PetServiceInterface {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Override
    public Pet save(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public List<Pet> getAll() {
        return petRepository.findAll();
    }

    @Override
    public Pet update(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public void delete(Long id) {
        petRepository.deleteById(id);
    }
    public Set<Pet> getPetsByReminderId(Long reminderId) {
        return petRepository.findPetsByRemindersId(reminderId);
    }
}