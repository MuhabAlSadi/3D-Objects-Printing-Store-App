// 👉 Your computer's local IP — required since you're using Expo Go on a real phone
//const API_URL = 'http://192.168.0.111:3000/api/auth';

// context/AuthContext.tsx
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

const API_URL = 'http://192.168.0.111:3000/api/auth';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'creator' | 'delivery' | 'owner';
  avatar: string | null;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; message: string }>;
  verifyResetOTP: (email: string, otp: string) => Promise<{ success: boolean; message: string; userId?: number }>;
  resetPassword: (userId: number, newPassword: string) => Promise<{ success: boolean; message: string }>;
  resendOTP: (email: string, type: 'verification' | 'reset') => Promise<{ success: boolean; message: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedAccessToken = await SecureStore.getItemAsync('accessToken');
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedAccessToken && storedUser) {
        setAccessToken(storedAccessToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to load stored auth:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAuthData = async (newAccessToken: string, refreshToken: string, newUser: User) => {
    await SecureStore.setItemAsync('accessToken', newAccessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    await SecureStore.setItemAsync('user', JSON.stringify(newUser));
    setAccessToken(newAccessToken);
    setUser(newUser);
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };
      return { success: true, message: data.message };
    } catch {
      return { success: false, message: 'Network error. Is your server running?' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };
      await saveAuthData(data.accessToken, data.refreshToken, data.user);
      return { success: true, message: 'Logged in successfully!' };
    } catch {
      return { success: false, message: 'Network error. Is your server running?' };
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('user');
    setAccessToken(null);
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return { success: res.ok, message: data.message };
    } catch {
      return { success: false, message: 'Network error. Is your server running?' };
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      return { success: res.ok, message: data.message };
    } catch {
      return { success: false, message: 'Network error. Is your server running?' };
    }
  };

  const verifyResetOTP = async (email: string, otp: string) => {
    try {
      const res = await fetch(`${API_URL}/verify-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };
      return { success: true, message: data.message, userId: data.userId };
    } catch {
      return { success: false, message: 'Network error. Is your server running?' };
    }
  };

  const resetPassword = async (userId: number, newPassword: string) => {
    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newPassword }),
      });
      const data = await res.json();
      return { success: res.ok, message: data.message };
    } catch {
      return { success: false, message: 'Network error. Is your server running?' };
    }
  };

  const resendOTP = async (email: string, type: 'verification' | 'reset') => {
    try {
      const res = await fetch(`${API_URL}/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type }),
      });
      const data = await res.json();
      return { success: res.ok, message: data.message };
    } catch {
      return { success: false, message: 'Network error. Is your server running?' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user, accessToken, isLoading,
        signUp, signIn, signOut,
        forgotPassword, verifyOTP, verifyResetOTP,
        resetPassword, resendOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
