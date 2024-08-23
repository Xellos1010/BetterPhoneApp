// File: /Users/evanmccall/React-Projects/BetterPhone-App/components/Contacts/ContactsDisplay.tsx

import React, { useEffect, useState, useMemo } from "react";
import {
    SafeAreaView,
    ActivityIndicator,
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Image,
    FlatList,
} from "react-native";
import * as Contacts from 'expo-contacts';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useContacts } from "@/context/ContactsContext"; // Import the contacts context
import ListItem from "./ListItem";
import Avatar from "./Avatar";
import SearchBar from "./SearchBar";
import { createLogger } from "@/utils/logger";
import { ENV } from "@/utils/env";
import { ThemedView } from "../ThemedComponents/ThemedView";
import { ThemedTextInput } from "../ThemedComponents/ThemedTextInput";
import { ThemedText } from "../ThemedComponents/ThemedText";

const ContactsDisplay: React.FC = () => {
    const logger = createLogger("ContactsDisplay");
    const {
        contacts,
        loading,
        search,
        addNew,
        deleteContact,
        refreshContacts
    } = useContacts(); // Use the contacts context

    const [searchPlaceholder, setSearchPlaceholder] = useState<string>("Search");
    const [typeText, setTypeText] = useState<string>("");

    // Memoized contacts sorted in alphabetical order
    const sortedContacts = useMemo(() => {
        return [...(contacts || [])].sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
            return nameA.localeCompare(nameB); // Compare names alphabetically
        });
    }, [contacts]); // Only recalculate when contacts change

    useEffect(() => {
        const loadContactsIfNeeded = async () => {
            if (await Contacts.isAvailableAsync()) {
                const { status } = await Contacts.getPermissionsAsync();
                if (status === 'granted') {
                    if (contacts.length < 1) {
                        refreshContacts();
                    }
                }
            } else {
                if (ENV === 'DEV') {
                    refreshContacts();
                }
            }
        };
        loadContactsIfNeeded();
    }, [refreshContacts, contacts.length]);

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Image
                source={require("@/assets/images/logo.png")}
                style={styles.logo}
            />
            <Button title="Add new" onPress={addNew} />
            <SearchBar
                searchPlaceholder={searchPlaceholder}
                onChangeText={search}
            />
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>End of Contacts</Text>
        </View>
    );

    const renderItem = ({ item }: { item: Contacts.Contact }) => {
        const {
            id,
            firstName = "Unknown",
            lastName = "",
            company = "",
            image,
        } = item || {};

        return (
            <ListItem
                leftElement={
                    <Avatar
                        img={image ? { uri: image } : undefined}
                        placeholder={getAvatarInitials(`${firstName} ${lastName}`)}
                        width={40}
                        height={40}
                    />
                }
                title={<ThemedText style={styles.titleText}>{`${firstName} ${lastName}`}</ThemedText>}
                description={<ThemedText style={styles.descriptionText}>{company}</ThemedText>}
                onPress={() => { logger.warn("onPress Contact needs to be implemented with expo-contacts"); }}
                onLongPress={() => { logger.warn("onLongPress Contact needs to be implemented with expo-contacts"); }}
                onDelete={() => {
                    deleteContact(id!); // Call the deleteContact function from context
                    logger.verbose(`Contact with ID: ${id} deleted.`);
                }}
            />
        );
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView style={styles.safeAreaContainer}>

                <ThemedView style={styles.inputContainer}>
                    <ThemedTextInput
                        keyboardType='number-pad'
                        placeholder='Enter number to add to contact'
                        onChangeText={text => setTypeText(text)}
                        value={typeText}
                        style={styles.input}
                    />
                </ThemedView>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
                ) : (
                    <FlatList
                        data={sortedContacts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id ? item.id.toString() : ''}
                        // ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFooter}
                        contentContainerStyle={styles.scrollView}
                    />
                )}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

// Correcting the getAvatarInitials function
const getAvatarInitials = (textString: string) => {
    if (!textString) return "";
    const text = textString.trim();
    const textSplit = text.split(" ");

    if (textSplit.length <= 1) return text.charAt(0);
    return textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);  // Corrected this line
};

// Styles for ContactsDisplay component
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeAreaContainer: {
        flex: 1,
    },
    inputContainer: {
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        textAlign: 'center',
        marginBottom: 8,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        aspectRatio: 6,
        width: '100%',
        height: undefined,
        resizeMode: 'contain',
    },
    footerContainer: {
        padding: 20,
    },
    footerText: {
        textAlign: 'center',
        color: 'gray',
    },
    titleText: {
        fontSize: 18,
    },
    descriptionText: {
        fontSize: 14,
        color: 'gray',
    },
    scrollView: {
        flex: 1,
    },
});

export default ContactsDisplay; // Export the component