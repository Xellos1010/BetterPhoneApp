// BetterPhoneApp/app/(tabs)/BetterContacts.tsx

import React from 'react';
import { Platform, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '@/context/AuthContext';

import AuthenticationComponent from '@/components/AuthenticationComponent';
import ContactsDisplay from '@/components/contacts/ContactsDisplay';
import { ThemedView } from '@/components/ThemedComponents/ThemedView';
import ParallaxScrollView from '@/components/ThemedComponents/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedComponents/ThemedText';
import { ThemedButton } from '@/components/ThemedComponents/ThemedButton';

/**
 * BetterContacts component
 * This component handles managing authentication state and rendering the ContactsDisplay.
 * @returns {JSX.Element} The rendered BetterContacts screen.
 */
const BetterContacts = (): JSX.Element => {
    const navigation = useNavigation();
    const { isAuthenticated } = useAuthContext();

    // Show authentication component if user is not authenticated on web
    if (Platform.OS === 'web' && !isAuthenticated) {
        return <AuthenticationComponent />;
    }

    // Return the ContactsDisplay component where the contacts are loaded and displayed
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <ThemedText>Contacts</ThemedText>
            }>
            <ThemedView style={styles.container}>
                <ContactsDisplay />

            </ThemedView>
            <ThemedButton title="Back" onPress={() => navigation.goBack()} />
        </ParallaxScrollView>
    );
};

// Styles for BetterContacts component
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default BetterContacts;
