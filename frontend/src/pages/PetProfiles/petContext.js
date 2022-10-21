import React from 'react';

export const UseFetchPetsContext = React.createContext({
    pet: null,
    setPet: () => {},
});

export const ModalContext = React.createContext({
    modalOpen: false,
    toggleModalOpen: () => {},
});

export const UpdateModalContext = React.createContext({
    updateModalOpen: false,
    toggleUpdateModalOpen: () => {},
});

export const UseFetchPetRemindersContext = React.createContext({
    petReminders: null,
    setPetReminders: () => {},
})

export const PetReminderContext = React.createContext({
    PetReminder: null,
    setPetReminder: () => {},
});
