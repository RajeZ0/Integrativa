import api from './api';
import Cookies from 'js-cookie';

export interface User {
    id: number;
    name: string;
    email: string;
    role: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface AuthResponse {
    token: string;
    user: User;
}

export const auth = {
    /**
     * Login user
     */
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/login', { email, password });
        const { token, user } = response.data;

        // Save token and user in cookies
        Cookies.set('auth_token', token, { expires: 7 }); // 7 days
        Cookies.set('user', JSON.stringify(user), { expires: 7 });

        return response.data;
    },

    /**
     * Register new user
     */
    async register(name: string, email: string, password: string, password_confirmation: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/register', {
            name,
            email,
            password,
            password_confirmation,
        });
        const { token, user } = response.data;

        // Save token and user in cookies
        Cookies.set('auth_token', token, { expires: 7 });
        Cookies.set('user', JSON.stringify(user), { expires: 7 });

        return response.data;
    },

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear cookies
            Cookies.remove('auth_token');
            Cookies.remove('user');
        }
    },

    /**
     * Get current user
     */
    async me(): Promise<User> {
        const response = await api.get<{ user: User }>('/me');
        return response.data.user;
    },

    /**
     * Get current user from cookies
     */
    getCurrentUser(): User | null {
        const userStr = Cookies.get('user');
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!Cookies.get('auth_token');
    },

    /**
     * Check if user is admin
     */
    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user?.role.slug === 'admin';
    },

    /**
     * Check if user is regular user
     */
    isUser(): boolean {
        const user = this.getCurrentUser();
        return user?.role.slug === 'user';
    },
};
