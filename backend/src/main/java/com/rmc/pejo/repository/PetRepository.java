package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface PetRepository extends JpaRepository<Pet, Long> {
    Set<Pet> findPetsByPetRemindersId(Long id);
}
