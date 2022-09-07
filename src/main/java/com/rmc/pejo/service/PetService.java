package com.rmc.pejo.service;

import com.rmc.pejo.entity.Pet;

import java.util.List;

public interface PetService {
    Pet savePet(Pet pet);
    List<Pet> getPets();
    Pet updatePet(Pet pet, Long id);
    void deletePet(Long id);
}
