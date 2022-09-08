package com.rmc.pejo.service;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service

public class PetServiceImp implements PetService{

    @Autowired
    private PetRepository petRepository;

    @Override
    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public List<Pet> getPets() {
        return (List<Pet>) petRepository.findAll();
    }

    @Override
    public Pet updatePet(Pet pet, Long id) {
        Pet petData = petRepository.findById(id).get();
        if (Objects.nonNull(pet.getName())
                && !"".equalsIgnoreCase(pet.getName())){
            petData.setName(pet.getName());
        }
        if (Objects.nonNull(pet.getBirthDate())){
            petData.setBirthDate(pet.getBirthDate());
        }
        if (Objects.nonNull(pet.getType())){
            petData.setType(pet.getType());
        }
        if (Objects.nonNull(pet.getSex())){
            petData.setSex(pet.getSex());
        }
        return petRepository.save(petData);
    }

    @Override
    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}
