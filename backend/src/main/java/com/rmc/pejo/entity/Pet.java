package com.rmc.pejo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Table
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @JoinTable(
            name = "pet_reminders",
            joinColumns = @JoinColumn(name = "pet_id"),
            inverseJoinColumns = @JoinColumn(name = "reminder_id"))
    private List<Reminder> reminders;
}