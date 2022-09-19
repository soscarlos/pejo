package com.rmc.pejo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Reminder {
    @Id
    @GeneratedValue
    private long id;
    private LocalDate date;
    private LocalTime time;
    private String title;
    private String description;

}
