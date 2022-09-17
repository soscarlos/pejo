package com.rmc.pejo.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

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
    private PetType petType;
    @NonNull
    private SexType sexType;
}