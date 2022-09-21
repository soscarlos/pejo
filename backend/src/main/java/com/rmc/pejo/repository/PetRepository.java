package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    Set<Pet> findPetsByPetRemindersId(Long reminderId);
}
