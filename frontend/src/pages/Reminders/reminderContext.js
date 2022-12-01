import React from 'react';
import useFetch from '../../hooks/useFetch';


export const ModalContext = React.createContext({
    modalOpen: false,
    toggleModalOpen: () => {},
});

export const UpdateModalContext = React.createContext({
    updateModalOpen: false,
    toggleUpdateModalOpen: () => {},
});

export const ReminderNotificationModalContext = React.createContext({
    reminderNotificationModalOpen: false,
    toggleReminderNotificationModalOpen: () => {},
});

export const ShowReminderContext = React.createContext({
    showReminder: null,
    setShowReminder: () => {},
});

export const FetchUrlContext = React.createContext('http://localhost:8080/reminders');

export const UseFetchRemindersContext = React.createContext({
    reminders: null,
    setReminders: () => {},
});

export const IsPetContext = React.createContext({
    isPet: false,
})

