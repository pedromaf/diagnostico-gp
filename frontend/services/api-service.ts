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
            return {
                data: null,
                error: error instanceof Error ? error.message : AppConstants.ERROR_NETWORK,
            };
        }
    }

    async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error(AppConstants.ERROR_NETWORK);

            const data: T = await response.json();

            return { data };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : AppConstants.ERROR_NETWORK,
            };
        }
    }

    async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error(AppConstants.ERROR_NETWORK);

            const data: T = await response.json();

            return { data };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : AppConstants.ERROR_NETWORK,
            };
        }
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error(AppConstants.ERROR_NETWORK);

            let data: T | null = null;
            if (response.status !== 204) {
                data = await response.json();
            }

            return { data };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : AppConstants.ERROR_NETWORK,
            };
        }
    }
}

export const apiService = new ApiService();