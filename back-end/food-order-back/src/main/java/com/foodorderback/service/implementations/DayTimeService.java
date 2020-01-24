package com.foodorderback.service.implementations;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DayTimeService {

    private static final int HOUR_MORNING = 10;
    private static final int HOUR_NOON = 14;
    private static final int HOUR_EVENING = 17;

    boolean isMorning() {
        return LocalDateTime.now().getHour() < HOUR_MORNING;
    }

    boolean isNoon() {
        return LocalDateTime.now().getHour() >= HOUR_MORNING && LocalDateTime.now().getHour() < HOUR_NOON;
    }

    boolean isAfterNoon() {
        return LocalDateTime.now().getHour() >= HOUR_NOON && LocalDateTime.now().getHour() < HOUR_EVENING;
    }

    boolean isEvening() {
        return LocalDateTime.now().getHour() >= HOUR_EVENING;
    }
}
