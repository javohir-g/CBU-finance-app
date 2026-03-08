import apiClient from "../client";

// ========================================
// 🔔 NOTIFICATIONS SERVICE
// ========================================

export interface Notification {
    id: number;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    is_read: boolean;
    created_at: string;
}

export interface NotificationsResponse {
    notifications: Notification[];
    unread_count: number;
}

export const notificationService = {
    /**
     * Get notifications
     */
    getNotifications: async (): Promise<NotificationsResponse> => {
        const response = await apiClient.get<NotificationsResponse>("/notifications");
        return response.data;
    },

    /**
     * Mark notification as read
     */
    markAsRead: async (id: number): Promise<{ success: boolean }> => {
        const response = await apiClient.patch<{ success: boolean }>(`/notifications/${id}/read`);
        return response.data;
    },

    /**
     * Mark all as read
     */
    markAllAsRead: async (): Promise<{ success: boolean }> => {
        const response = await apiClient.patch<{ success: boolean }>("/notifications/read-all");
        return response.data;
    }
};
