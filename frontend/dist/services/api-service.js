var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AppConstants } from "../util/constants.js";
const API_BASE_URL = AppConstants.API_BASE_URL;
class ApiService {
    get(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${API_BASE_URL}/${endpoint}`);
                if (!response.ok)
                    throw new Error(AppConstants.ERROR_NETWORK);
                const data = yield response.json();
                return { data };
            }
            catch (error) {
                return {
                    data: null,
                    error: error instanceof Error ? error.message : AppConstants.ERROR_NETWORK,
                };
            }
        });
    }
    post(endpoint, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${API_BASE_URL}/${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                if (!response.ok)
                    throw new Error(AppConstants.ERROR_NETWORK);
                const data = yield response.json();
                return { data };
            }
            catch (error) {
                return {
                    data: null,
                    error: error instanceof Error ? error.message : AppConstants.ERROR_NETWORK,
                };
            }
        });
    }
    put(endpoint, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${API_BASE_URL}/${endpoint}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                if (!response.ok)
                    throw new Error(AppConstants.ERROR_NETWORK);
                const data = yield response.json();
                return { data };
            }
            catch (error) {
                return {
                    data: null,
                    error: error instanceof Error ? error.message : AppConstants.ERROR_NETWORK,
                };
            }
        });
    }
    delete(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${API_BASE_URL}/${endpoint}`, {
                    method: 'DELETE',
                });
                if (!response.ok)
                    throw new Error(AppConstants.ERROR_NETWORK);
                let data = null;
                if (response.status !== 204) {
                    data = yield response.json();
                }
                return { data };
            }
            catch (error) {
                return {
                    data: null,
                    error: error instanceof Error ? error.message : AppConstants.ERROR_NETWORK,
                };
            }
        });
    }
}
export const apiService = new ApiService();
