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
