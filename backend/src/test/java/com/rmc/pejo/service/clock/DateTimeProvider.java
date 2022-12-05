package com.rmc.pejo.service.clock;

import java.time.*;

public class DateTimeProvider {
    public ZonedDateTime getZonedDateTime() {
        return ZonedDateTime.of(
                        2022,
                        6,
                        10,
                        12,
                        30,
                        30,
                        0,
                        ZoneId.of("UTC"));
    }
    public LocalDateTime getLocalDateTime() {
        return LocalDateTime.of(getLocalDate(), getLocalTime());
    }
    public LocalDate getLocalDate() {
        return LocalDate.of(2022, 6, 10);
    }

    public LocalTime getLocalTime() {
        return LocalTime.of(12, 30, 30, 0);
    }
}
