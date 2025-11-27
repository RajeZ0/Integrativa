'use client';

import { useState, useEffect, useCallback } from 'react';
import { auth, type User } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Load user from cookies on mount
    useEffect(() => {
        const currentUser = auth.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await auth.login(email, password);
            setUser(response.user);

            // Redirect based on role
            if (response.user.role.slug === 'admin') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }

            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [router]);

    const logout = useCallback(async () => {
        try {
            setLoading(true);
            await auth.logout();
            setUser(null);
            router.push('/login');
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setLoading(false);
        }
    }, [router]);

    const register = useCallback(async (name: string, email: string, password: string, password_confirmation: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await auth.register(name, email, password, password_confirmation);
            setUser(response.user);

            // Redirect based on role
            if (response.user.role.slug === 'admin') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }

            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Error al registrarse';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [router]);

    return {
        user,
        loading,
        error,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isAdmin: user?.role.slug === 'admin',
        isUser: user?.role.slug === 'user',
    };
}
