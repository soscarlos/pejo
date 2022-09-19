package com.rmc.pejo.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NonNull
    private String name;
    @NonNull
    private LocalDate birthDate;
    @NonNull
    @Enumerated(EnumType.STRING)
    private PetType petType;
    @NonNull
    @Enumerated(EnumType.STRING)
    private SexType sexType;
    @ManyToMany
    private Set<Reminder> reminders;
}