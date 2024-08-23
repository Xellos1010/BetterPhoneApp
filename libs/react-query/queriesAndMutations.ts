// File: /Users/evanmccall/React-Projects/BetterPhone-App/libs/react-query/queriesAndMutations.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import * as Contacts from 'expo-contacts';
import { Contact as ContactsType } from 'expo-contacts';
import { QUERY_KEYS, QUERY_KEYS_ARRAY } from './queryKeys'; // Import the modified query keys
import { getContactsInstance } from '@/libs/contacts/getContacts';

// Function to create Invalidation Filters
const createInvalidateFilters = (queryKey: string) => {
    return {
        queryKey: [queryKey],  // ensure the key is wrapped in an array
    };
};


export const useGetContacts = () => {
    return useQuery<ContactsType[], Error>({
        queryKey: QUERY_KEYS_ARRAY.GET_CONTACTS, // Update to use the string array
        queryFn: getContactsInstance,
        retry: false,
    });
};

// Add new contact mutation
export const useAddContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newContact: Omit<ContactsType, 'id'>) => {
            await Contacts.addContactAsync(newContact);
            return newContact;
        },
        onSuccess: () => {
            const filters = createInvalidateFilters(QUERY_KEYS.GET_CONTACTS);
            queryClient.invalidateQueries(filters); // Use the filter
        },
    });
};


// Delete contact mutation
export const useDeleteContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await Contacts.removeContactAsync(id);
            return id;
        },
        onSuccess: () => {
            const filters = createInvalidateFilters(QUERY_KEYS.GET_CONTACTS);
            queryClient.invalidateQueries(filters); // Use the filter
        },
    });
};

// Search contacts query
export const useSearchContacts = (queryText: string) => {
    return useQuery<Contacts.Contact[], Error>({
        queryKey: [QUERY_KEYS.GET_CONTACTS, queryText], // Correctly set the query key
        queryFn: async () => {
            if (!queryText.trim()) return []; // Return empty array if query is empty

            const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
            const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

            let contactsData;
            if (phoneNumberRegex.test(queryText)) {
                contactsData = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                    name: queryText,
                });
            } else if (emailAddressRegex.test(queryText)) {
                contactsData = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails],
                    name: queryText,
                });
            } else {
                contactsData = await Contacts.getContactsAsync({
                    name: queryText,
                });
            }

            return contactsData.data; // Return the results
        },
        // Here, you can set other options like stale time, refetchOnWindowFocus, etc.
    });
};