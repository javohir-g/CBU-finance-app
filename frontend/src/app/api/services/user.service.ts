import apiClient from "../client";

// ========================================
// 👤 USER SERVICE
// ========================================

export interface UserProfile {
    id: number;
    name: string;
    username: string;
    email?: string;
    phone?: string;
    avatar: string;
    language: "rus" | "uzb";
    theme: "light" | "dark";
    created_at: string;
}

export interface UserBalance {
    totalBalance: number;
    currency: "USD" | "UZS";
}

export const userService = {
    /**
     * Get user profile
     */
    getProfile: async (): Promise<UserProfile> => {
        const response = await apiClient.get<UserProfile>("/user/profile");
        return response.data;
    },

    /**
     * Update user profile
     */
    updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
        const response = await apiClient.put<UserProfile>("/user/profile", data);
        return response.data;
    },

    /**
     * Get user balance
     */
    getBalance: async (): Promise<UserBalance> => {
        const response = await apiClient.get<UserBalance>("/user/balance");
        return response.data;
    }
};
