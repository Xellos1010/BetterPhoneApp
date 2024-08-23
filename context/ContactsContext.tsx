// File: /Users/evanmccall/React-Projects/BetterPhone-App/context/ContactsContext.tsx

import React, { createContext, useContext, useEffect } from "react";
import { createLogger } from "@/utils/logger";
import { useGetContacts, useAddContact, useDeleteContact, useSearchContacts } from '@/libs/react-query/queriesAndMutations'; // Import the hooks
import * as Contacts from 'expo-contacts';

const logger = createLogger("ContactsProvider");

type ContactsContextType = {
    contacts: Contacts.Contact[]; // Ensure contacts is always an array
    loading: boolean;
    search: (text: string) => void;
    addNew: () => Promise<void>;
    deleteContact: (id: string) => void;
    refreshContacts: () => Promise<void>; // Add refreshContacts to context type
};

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: contacts = [], isLoading: loading, refetch: refetchContacts } = useGetContacts(); // Provide default as an empty array and expose refetch
    const addContactMutation = useAddContact();
    const deleteContactMutation = useDeleteContact();
    
    const [queryText, setQueryText] = React.useState<string>(""); // Define local state for storing search text
    const { data: searchedContacts = [] } = useSearchContacts(queryText); // Provide default as an empty array

    const search = (text: string) => {
        setQueryText(text); // Update query text
    };

    const addNew = async () => {
        const formOptions: Contacts.FormOptions = {
            allowsEditing: true,
            message: "Add a New Contact",
            isNew: true,
        };

        try {
            const newContact = await Contacts.presentFormAsync(null, null, formOptions);
            if (newContact) {
                await addContactMutation.mutateAsync(newContact); // Add contact
                logger.verbose('New contact added:', newContact);
                await refetchContacts(); // Refresh contacts after adding
            }
        } catch (error) {
            logger.error("Error adding new contact:", error);
        }
    };

    const deleteContact = (id: string) => {
        deleteContactMutation.mutate(id); // Delete contact
    };

    const refreshContacts = async () => {
        await refetchContacts(); // Call refetch to refresh contact list
    };

    return (
        <ContactsContext.Provider value={{
            contacts: queryText ? (searchedContacts || []) : contacts, // Use searched contacts if there is a search term; fallback to an empty array if undefined
            loading,
            search,
            addNew,
            deleteContact,
            refreshContacts
        }}>
            {children}
        </ContactsContext.Provider>
    );
};

// Custom hook to use the Contacts context
export const useContacts = () => {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error('useContacts must be used within a ContactsProvider');
    }
    return context;
};