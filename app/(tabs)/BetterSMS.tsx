// BetterPhoneApp/app/(tabs)/BetterSMS.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedComponents/ThemedText';
import { ThemedView } from '@/components/ThemedComponents/ThemedView';
import ParallaxScrollView from '@/components/ThemedComponents/ParallaxScrollView';
import { ThemedButton } from '@/components/ThemedComponents/ThemedButton';

/**
 * Placeholder screen for the BetterSMS feature.
 * Displays a 'Coming Soon' message with a back button to return to the main menu.
 *
 * @returns {JSX.Element} The rendered placeholder screen for BetterSMS.
 */
const BetterSMS = (): JSX.Element => {
    const navigation = useNavigation();

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <ThemedText>SMS</ThemedText>
            }>
            <ThemedView style={styles.container}>
                <ThemedText style={styles.title}>BetterSMS - Coming Soon</ThemedText>
                <ThemedButton title="Back" onPress={() => navigation.goBack()} />
            </ThemedView>
        </ParallaxScrollView>
    );
};

// Styles for BetterSMS component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24, // Equivalent to text-xl
        marginBottom: 20, // Equivalent to mb-5
    },
});

export default BetterSMS; // Exporting the component