package com.rmc.pejo.endpoints.request;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReminderTimeRequest(LocalDate date, LocalTime time) {
}
