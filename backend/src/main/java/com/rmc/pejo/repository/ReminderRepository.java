package com.rmc.pejo.repository;

import com.rmc.pejo.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Set;
@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    Set<Reminder> findRemindersByPetsId(Long petId);

    Set<Reminder> findFirst3ByDateAfterOrderByDateAsc(@Param("startDate")LocalDate startDate);
}
