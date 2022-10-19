import React from 'react';

export const ModalContext = React.createContext({
    modalOpen: false,
    toggleModalOpen: () => {},
});