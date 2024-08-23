// BetterPhone-App/app/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser, IAuthContext } from '@/types/auth'; // Adjust import based on your project structure
// import { getCurrentUser } from '@/lib/appwrite/api'; // Uncomment and adjust when ready

export const INITIAL_USER: IUser = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
};

const INITIAL_STATE: IAuthContext = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {}, // Placeholder
    setIsAuthenticated: () => {}, // Placeholder
    checkAuthUser: async () => false, // Placeholder
};

const AuthContext = createContext<IAuthContext>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Placeholder checkAuthUser function
    const checkAuthUser = async () => {
        // Uncomment and implement your actual API logic
        // try {
        //     const currentAccount = await getCurrentUser();
        //     if (currentAccount) {
        //         setUser({
        //             id: currentAccount.$id        //             name: currentAccount.name,
        //             username: currentAccount.username,
        //             email: currentAccount.email,
        //             imageUrl: currentAccount.imageUrl,
        //             bio: currentAccount.bio,
        //         });
        //         setIsAuthenticated(true);
        //         return true;
        //     }
        //     return false;
        // } catch (error) {
        //     console.error(error);
        //     return false;
        // } finally {
        //     setIsLoading(false);
        // }
        setUser(INITIAL_USER); 
        setIsAuthenticated(false); 
        return true; // For testing purposes
    };

    useEffect(() => {
        const initializeAuth = async () => {
            await checkAuthUser();
        };
        initializeAuth();
    }, []);

    const value: IAuthContext = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;