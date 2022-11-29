package com.rmc.pejo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NonNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    @NonNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalTime time;
    @NonNull
    private String title;
    @NonNull
    private String description;
    @NonNull
    private boolean active;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate reminderDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalTime reminderTime;
    @JsonIgnore
    @ManyToMany(mappedBy = "petReminders")
    private List<Pet> reminderPets;
}
