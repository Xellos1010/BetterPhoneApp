// File: /Users/evanmccall/React-Projects/BetterPhone-App/libs/contacts/getContacts.ts

import * as Contacts from 'expo-contacts';
import { createLogger } from "@/utils/logger"; // Import the logger utility
import { ENV } from '@/utils/env';
const logger = createLogger("getContacts"); // Create a logger instance

// Placeholder contacts data for web environment
const placeholderContacts: Contacts.Contact[] = [
    {
        id: "1367",
        firstName: "david",
        lastName: "elliott",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5257/photo" },
        contactType: "person",
        name: "david elliott"
    },
    {
        id: "1254",
        firstName: "Kobi",
        lastName: "deGraft-Johnson",
        imageAvailable: false,
        contactType: "person",
        name: "Kobi deGraft-Johnson, (NYC-MRM)"
    },
    {
        id: "2374",
        firstName: "Alice",
        lastName: "Smith",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5258/photo" },
        contactType: "person",
        name: "Alice Smith"
    },
    {
        id: "3489",
        firstName: "John",
        lastName: "Doe",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5259/photo" },
        contactType: "person",
        name: "John Doe"
    },
    {
        id: "4560",
        firstName: "Mary",
        lastName: "Johnson",
        imageAvailable: false,
        contactType: "person",
        name: "Mary Johnson"
    },
    {
        id: "5671",
        firstName: "Michael",
        lastName: "Brown",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5260/photo" },
        contactType: "person",
        name: "Michael Brown"
    },
    {
        id: "6782",
        firstName: "Jessica",
        lastName: "Taylor",
        imageAvailable: false,
        contactType: "person",
        name: "Jessica Taylor"
    },
    {
        id: "7893",
        firstName: "Daniel",
        lastName: "Wilson",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5261/photo" },
        contactType: "person",
        name: "Daniel Wilson"
    },
    {
        id: "8904",
        firstName: "Emma",
        lastName: "Anderson",
        imageAvailable: false,
        contactType: "person",
        name: "Emma Anderson"
    },
    {
        id: "9015",
        firstName: "James",
        lastName: "Harris",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5262/photo" },
        contactType: "person",
        name: "James Harris"
    },
    {
        id: "0126",
        firstName: "Sophia",
        lastName: "Clark",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5263/photo" },
        contactType: "person",
        name: "Sophia Clark"
    },
    {
        id: "1237",
        firstName: "William",
        lastName: "Robinson",
        imageAvailable: false,
        contactType: "person",
        name: "William Robinson"
    },
    {
        id: "2348",
        firstName: "Isabella",
        lastName: "Lewis",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5264/photo" },
        contactType: "person",
        name: "Isabella Lewis"
    },
    {
        id: "3459",
        firstName: "David",
        lastName: "Lee",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5265/photo" },
        contactType: "person",
        name: "David Lee"
    },
    {
        id: "4562",
        firstName: "Charlotte",
        lastName: "Walker",
        imageAvailable: false,
        contactType: "person",
        name: "Charlotte Walker"
    },
    {
        id: "5673",
        firstName: "Olivia",
        lastName: "Hall",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5266/photo" },
        contactType: "person",
        name: "Olivia Hall"
    },
    {
        id: "6784",
        firstName: "Ethan",
        lastName: "Allen",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5267/photo" },
        contactType: "person",
        name: "Ethan Allen"
    },
    {
        id: "7895",
        firstName: "Abigail",
        lastName: "Young",
        imageAvailable: false,
        contactType: "person",
        name: "Abigail Young"
    },
    {
        id: "8906",
        firstName: "Mason",
        lastName: "King",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5268/photo" },
        contactType: "person",
        name: "Mason King"
    },
    {
        id: "9017",
        firstName: "Samuel",
        lastName: "Scott",
        imageAvailable: false,
        contactType: "person",
        name: "Samuel Scott"
    },
    {
        id: "0128",
        firstName: "Avery",
        lastName: "Adams",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5269/photo" },
        contactType: "person",
        name: "Avery Adams"
    },
    {
        id: "1239",
        firstName: "Lucas",
        lastName: "Baker",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5270/photo" },
        contactType: "person",
        name: "Lucas Baker"
    },
    {
        id: "2340",
        firstName: "Zoe",
        lastName: "Nelson",
        imageAvailable: false,
        contactType: "person",
        name: "Zoe Nelson"
    },
    {
        id: "3451",
        firstName: "Henry",
        lastName: "Carter",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5271/photo" },
        contactType: "person",
        name: "Henry Carter"
    },
    {
        id: "4563",
        firstName: "Mia",
        lastName: "Mitchell",
        imageAvailable: false,
        contactType: "person",
        name: "Mia Mitchell"
    },
    {
        id: "5674",
        firstName: "Daniel",
        lastName: "Perez",
        imageAvailable: true,
        image: { uri: "content://com.android.contacts/contacts/5272/photo" },
        contactType: "person",
        name: "Daniel Perez"
    },
    {
        id: "6785",
        firstName: "Liam",
        lastName: "Roberts",
        imageAvailable: false,
        contactType: "person",
        name: "Liam Roberts"
    },
];

// Ensure to replace image URIs with appropriate URIs for each contact.

export default placeholderContacts;

export const getContactsInstance = async () => {
    logger.verbose('Attempting to load contacts...');
    if (await Contacts.isAvailableAsync()) {
        logger.verbose('Contacts API is available');
        // Request permissions for accessing contacts
        const { status }: Contacts.PermissionResponse = await Contacts.requestPermissionsAsync();

        if (status !== 'granted') {
            logger.warn('Contacts permission not granted');
            throw new Error('Contacts permission not granted');
        }

        try {
            logger.verbose('Permission is granted. Loading contacts');

            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers], // Fetch specific fields
            });

            if (data.length > 0) {
                logger.verbose('Contacts loaded successfully:', data);
                return data; // Return the loaded contacts
            } else {
                logger.warn('No contacts found');
            }

        } catch (error) {
            logger.error('Error loading contacts:', error);
            throw error; // Rethrow the error for further handling
        }
    }
    else {
        logger.warn('Get contacts from local device functionality available for web builds');
        logger.info(`${ENV} Environment`); // Use backticks for template literal
        logger.debug(`${ENV} Environment`); // Use backticks for template literal
        if (ENV === 'development') {
            return placeholderContacts;
        }
    }
    return []; // Return an empty array if no contacts found
};