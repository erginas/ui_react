// src/common/hooks/useAuth.tsx
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextValue {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    login: () => {
    },
    logout: () => {
    },
    isAuthenticated: false,
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUser({
                    id: decoded.sub || '0',
                    name: decoded.name || 'Kullanıcı',
                    email: decoded.email || 'mail@example.com',
                    role: decoded.role || 'viewer',
                });
            } catch (err) {
                localStorage.removeItem('authToken');
            }
        }
        setLoading(false);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        try {
            const decoded: any = jwtDecode(token);
            setUser({
                id: decoded.sub || '0',
                name: decoded.name || 'Kullanıcı',
                email: decoded.email || 'email@example.com',
                role: decoded.role || 'viewer',
            });
        } catch (error) {
            console.error('Token decode hatası:', error);
            setUser(null);
        }
    };
    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, isAuthenticated: !!user, loading}}>
            {children}
        </AuthContext.Provider>
    );
};
