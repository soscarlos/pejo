package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    Set<Reminder> findRemindersByPetsId(Long petId);
}
