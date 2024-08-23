// File: /Users/evanmccall/React-Projects/BetterPhone-App/components/Contacts/ContactsDisplay.tsx

import React, { useEffect, useState, useMemo } from "react";
import {
    SafeAreaView,
    Text,
    View,
    Image,
    TextInput,
    ActivityIndicator,
    Button
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useContacts } from "@/context/ContactsContext"; // Import the contacts context
import SearchBar from "./SearchBar"; // Assuming you still need the SearchBar
import { createLogger } from "@/utils/logger";
import { useGetContacts } from "@/libs/react-query/queriesAndMutations"; // Import the query
import * as Contacts from 'expo-contacts';
import ContactsList from "../ContactsList"; // Import the ContactsList component

interface DataItem {
  key: string; // Contact ID
  value: string; // Full name
}

const ContactsDisplay: React.FC = () => {
    const logger = createLogger("ContactsDisplay");
    const {
        contacts,
        loading,
        search,
        addNew,
        refreshContacts
    } = useContacts();
    
    const [searchPlaceholder, setSearchPlaceholder] = useState<string>("Search");
    const [searchText, setSearchText] = useState<string>("");
    const [sortedContacts, setSortedContacts] = useState<Contacts.Contact[]>([]);

    const { data: fetchContacts, isLoading } = useGetContacts(); // Get contacts from the query

    // Memoized contacts sorted in alphabetical order
    useEffect(() => {
        if (fetchContacts) {
            const sorted = [...fetchContacts].sort((a, b) => {
                const nameA = `${a.firstName ?? ""} ${a.lastName ?? ""}`.toLowerCase();
                const nameB = `${b.firstName ?? ""} ${b.lastName ?? ""}`.toLowerCase();
                return nameA.localeCompare(nameB);
            });
            setSortedContacts(sorted);
        }
    }, [fetchContacts]);

    // Load contacts if permissions are not granted or no contacts are available 
    useEffect(() => {
        const loadContactsIfNeeded = async () => {
            if (!isLoading && fetchContacts && fetchContacts.length < 1) {
                await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers]
                });
            }
        };
        loadContactsIfNeeded();
    }, [isLoading, fetchContacts]);

    // Call refreshContacts to update data when component mounts
    useEffect(() => {
        const loadContactsIfNeeded = async () => {
            if (await Contacts.isAvailableAsync()) {
                const { status } = await Contacts.getPermissionsAsync();
                if (status !== 'granted' || contacts.length < 1) {
                    refreshContacts();
                }
            }
        };
        loadContactsIfNeeded();
    }, [refreshContacts]);

    // Prepare data as DataItem[]
    const contactItems = useMemo<DataItem[]>(() => {
        return sortedContacts.map(contact => {
            const contactName = `${contact.firstName ?? ""} ${contact.lastName ?? ""}`;
            return {
                key: contact.id ?? "", // Use contact ID as the key
                value: contactName // Use the full name as the value
            };
        });
    }, [sortedContacts]);

    // Header for the ContactsDisplay
    const renderHeader = () => (
        <View className="p-5 justify-center items-center">
            <Button title="Add new" onPress={addNew} />
            <SearchBar
                searchPlaceholder={searchPlaceholder}
                onChangeText={searchText} // Assuming how you manage the search
            />
        </View>
    );

    return (
        <GestureHandlerRootView className="flex-1">
            <SafeAreaView className="flex-1">
                {loading || isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center items-center" />
                ) : (
                    <View className="flex-1">
                        <Image
                            source={require("@/assets/images/logo.png")}
                            className="aspect-ratio-6 object-contain"
                        />
                        <ContactsList
                            data={contactItems} // Pass the flat array of DataItem
                        />
                    </View>
                )}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default ContactsDisplay;