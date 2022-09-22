package com.rmc.pejo.runner;

import com.rmc.pejo.entity.Pet;
import com.rmc.pejo.entity.Reminder;
import com.rmc.pejo.repository.PetRepository;
import com.rmc.pejo.repository.ReminderRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Configuration
@ConfigurationProperties("dataset")
public class DatabaseFiller {
    private List<Pet> pets;
    private List<Reminder> reminders;

    @Bean
    ApplicationRunner filler(PetRepository petRepository, ReminderRepository reminderRepository){
        return args -> {
            petRepository.saveAll(pets);
            reminderRepository.saveAll(reminders);

            Pet mogli = pets.get(0);
            Pet bob = pets.get(1);

            mogli.setPetReminders(new ArrayList<>());
            bob.setPetReminders(new ArrayList<>());

            List<Reminder> mogliReminders = mogli.getPetReminders();
            List<Reminder> bobReminders = bob.getPetReminders();

            Reminder reminder1 = reminders.get(0);
            Reminder reminder2 = reminders.get(1);
            Reminder reminder3 = reminders.get(2);
            Reminder reminder4 = reminders.get(3);

            Collections.addAll(mogliReminders, reminder1, reminder2, reminder3);
            Collections.addAll(bobReminders, reminder2, reminder4);

            petRepository.save(mogli);
            petRepository.save(bob);
        };
    }

    public void setPets(List<Pet> pets) {
        this.pets = pets;
    }

    public void setReminders(List<Reminder> reminders) {
        this.reminders = reminders;
    }
}
