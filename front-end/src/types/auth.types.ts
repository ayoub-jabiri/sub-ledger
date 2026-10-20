export interface Credentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends Credentials {
    name: string;
    confirmPassword: string;
}

export interface SliceErrorResponse {
    message: string;
    statusCode: number;
    errors?: {
        [key: string]: string[];
    };
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: SliceErrorResponse | null;
}
