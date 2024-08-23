// BetterPhoneApp/app/(tabs)/BetterVoice.tsx
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedComponents/ThemedText';
import { ThemedView } from '@/components/ThemedComponents/ThemedView';
import ParallaxScrollView from '@/components/ThemedComponents/ParallaxScrollView';

/**
 * Placeholder screen for the BetterVoice feature.
 * Displays a 'Coming Soon' message with a back button to return to the main menu.
 *
 * @returns {JSX.Element} The rendered placeholder screen for BetterVoice.
 */
const BetterVoice = (): JSX.Element => {
    const navigation = useNavigation();

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <ThemedText>Voice</ThemedText>
            }>
            <ThemedView style={styles.container}>
                <ThemedText style={styles.title}>BetterVoice - Coming Soon</ThemedText>
                <Button
                    title="Back"
                    onPress={() => navigation.goBack()} // Navigate to the previous screen
                />
            </ThemedView>
        </ParallaxScrollView>
    );
};

// Styles for BetterVoice component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28, // Equivalent to text-2xl
        marginBottom: 20, // Equivalent to mb-5
    },
});

export default BetterVoice; // Exporting the component