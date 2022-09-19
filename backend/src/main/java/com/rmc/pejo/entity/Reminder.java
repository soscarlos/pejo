package com.rmc.pejo.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Reminder {
    @Id
    @GeneratedValue
    private long id;
    @NonNull
    private LocalDate date;
    @NonNull
    private LocalTime time;
    @NonNull
    private String title;
    @NonNull
    private String description;
    @NonNull
    private boolean active;
    @ManyToMany
    private Set<Pet> pets;

}
