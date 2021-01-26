import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('FortCorporation:token');
    const user = localStorage.getItem('FortCorporation:user');

    if (token && user) {
      const userJson = JSON.parse(user);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      return { token, user: userJson };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions/users', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('FortCorporation:token', token);
    localStorage.setItem('FortCorporation:user', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('FortCorporation:token');
    localStorage.removeItem('FortCorporation:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used with and AuthProvider');
  }

  return context;
}
