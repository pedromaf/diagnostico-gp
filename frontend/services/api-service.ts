import { AppConstants } from "../util/constants.js";

const API_BASE_URL = AppConstants.API_BASE_URL;

interface ApiResponse<T> {
    data: T | null;
    error?: string;
}

class ApiService {
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`);

            if (!response.ok) throw new Error(AppConstants.ERROR_NETWORK);

            const data: T = await response.json();

            return { data };
        } catch (error) {
            return { data: null, error: error instanceof Error ? error.message : 'An unknown error occurred' };
        }
    }

    async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data: T = await response.json();

            return { data };
        } catch (error) {
            return { data: null, error: error instanceof Error ? error.message : 'An unknown error occurred' };
        }
    }
}

export const apiService = new ApiService();
