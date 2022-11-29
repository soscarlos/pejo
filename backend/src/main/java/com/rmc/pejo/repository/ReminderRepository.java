package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Set;
import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    Set<Reminder> findRemindersByReminderPetsId(Long id);

    Set<Reminder> findFirst3ByDateAfterOrderByDateAscTimeAsc(LocalDate startDate);

    List<Reminder> findAllByActive(boolean active);
}
