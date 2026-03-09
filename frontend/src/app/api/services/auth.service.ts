import apiClient from "../client";

// ========================================
// 🔐 AUTH SERVICE
// ========================================

export interface TelegramAuthData {
    initData: string;
    colorScheme: string;
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
        phone?: string;
    };
}

export const authService = {
    /**
     * Login with Telegram data
     */
    loginWithTelegram: async (data: TelegramAuthData): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>("/auth/telegram", {
            colorScheme: data.colorScheme
        }, {
            headers: {
                Authorization: `tma ${data.initData}`
            }
        });
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
