
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Admin } from '../types';
import { DUMMY_USERS, DUMMY_ADMINS } from '../data/dummyData';

type CurrentUser = User | Admin | null;

interface AuthContextType {
  currentUser: CurrentUser;
  login: (email: string, pass: string, role: 'user' | 'admin') => boolean;
  register: (name: string, email: string, pass: string) => User | null;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string, pass: string, role: 'user' | 'admin'): boolean => {
    // In a real app, you'd verify the password hash. Here we just find the user.
    let userToLogin: CurrentUser = null;
    if (role === 'user') {
      userToLogin = DUMMY_USERS.find(u => u.email === email) || null;
    } else {
      userToLogin = DUMMY_ADMINS.find(a => a.email === email) || null;
    }

    if (userToLogin) {
      setCurrentUser(userToLogin);
      localStorage.setItem('currentUser', JSON.stringify(userToLogin));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, pass: string): User | null => {
    if (DUMMY_USERS.some(u => u.email === email)) {
        return null; // User already exists
    }
    const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user'
    };
    DUMMY_USERS.push(newUser); // In real app, this would be an API call
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  }

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  
  const value = { currentUser, login, register, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
