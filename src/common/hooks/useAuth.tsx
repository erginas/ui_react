  // src/common/hooks/useAuth.tsx
  import React, { createContext, useContext, ReactNode, useState } from 'react';

  export interface User { id: string; name: string; email: string }

interface AuthContextValue {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

  const AuthContext = createContext<AuthContextValue>({
    user: null,
    login: () => {},
    logout: () => {},
  });

  export const useAuth = () => useContext(AuthContext);

  interface AuthProviderProps { children: ReactNode; initialUser?: User }

  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
      // Sayfa yenilendiğinde localStorage'dan kullanıcı bilgisini yükle
      const token = localStorage.getItem('authToken');
      return token ? { id: '1', name: 'Admin', email: 'admin@example.com' } : null;
    });

const login = (token: string) => {
  localStorage.setItem('authToken', token);
      // setUser({ id: '1', name: 'Admin', email: 'admin@example.com' }); // API'den user bilgisi gelmiyorsa geçici çözüm
    };

    const logout = () => {
      localStorage.removeItem('authToken');
      setUser(null);
    };

    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };