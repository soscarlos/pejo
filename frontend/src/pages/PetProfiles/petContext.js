import React from 'react';

export const UseFetchPetsContext = React.createContext({
    pet: null,
    setPet: () => {},
});

export const PetModalContext = React.createContext({
    modalOpen: false,
    toggleModalOpen: () => {},
});

export const PetUpdateModalContext = React.createContext({
    updateModalOpen: false,
    toggleUpdateModalOpen: () => {},
});

export const UseFetchPetRemindersContext = React.createContext({
    petReminders: null,
    setPetReminders: () => {},
});

export const PetReminderContext = React.createContext({
    showReminder: null,
    setShowReminder: () => {},
});

export const PetIdContext = React.createContext({
    petId: 1,
});

export const FetchPetUrlContext = React.createContext('http://localhost:8080/pets/');

export const FetchPetRemindersUrlContext = React.createContext('http://localhost:8080/reminders/pet/');

export const AddPetModalContext = React.createContext({
    addPetModalOpen: false,
    toggleAddPetModalOpen: () => {},
});



