import apiClient from "../client";

// ========================================
// 🔐 AUTH SERVICE
// ========================================

export interface TelegramAuthData {
    initData: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    is_new_user?: boolean;
    user: {
        id: number;
        name: string;
        username: string;
        avatar: string;
    };
}

export const authService = {
    /**
     * Login with Telegram data
     */
    loginWithTelegram: async (data: TelegramAuthData): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>("/auth/telegram", data);
        return response.data;
    },

    /**
     * Verify current token
     */
    verifyToken: async (): Promise<AuthResponse> => {
        const response = await apiClient.get<AuthResponse>("/auth/verify");
        return response.data;
    }
};
