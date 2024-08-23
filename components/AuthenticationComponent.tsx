// BetterPhone-App/app/components/AuthenticationComponent.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { useAuthContext } from '@/context/AuthContext'; // Adjust the import based on your structure
import { ThemedText } from './ThemedComponents/ThemedText';
import { ThemedView } from './ThemedComponents/ThemedView';
import ParallaxScrollView from './ThemedComponents/ParallaxScrollView';
import { ThemedButton } from './ThemedComponents/ThemedButton';

/**
 * AuthenticationComponent component
 * This component handles user authentication flow and displays a sign-in prompt if the user is not authenticated.
 * @returns {JSX.Element} The rendered Authentication component.
 */
const AuthenticationComponent = (): JSX.Element => {
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();

    // Placeholder sign-in method
    const handleSignIn = () => {
        // You can put your authentication logic here
        console.log('Sign-in button pressed');
        setIsAuthenticated(true);
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <ThemedText>Authentication View</ThemedText>
            }
        >
            <ThemedView style={styles.container}>
                {!isAuthenticated && (
                    <>
                        <ThemedText style={styles.message}>You need to sign in to access contacts.</ThemedText>
                        <ThemedButton title="Sign In" onPress={handleSignIn} />
                    </>
                )}
            </ThemedView>
        </ParallaxScrollView>
    );
};

// Styles for AuthenticationComponent
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 24, // Equivalent to text-xl
        marginBottom: 20, // Equivalent to mb-5
    },
});

export default AuthenticationComponent;