import apiClient from "../client";

// ========================================
// 💰 SAVINGS SERVICE
// ========================================

export interface Goal {
    id: number;
    user_id: number;
    name: string;
    target_amount: number;
    saved_amount: number;
    currency: string;
    deadline?: string;
    icon?: string;
    color?: string;
    created_at: string;
}

export interface GoalsResponse {
    goals: Goal[];
    total: number;
}

export const savingsService = {
    /**
     * Get all savings goals
     */
    getGoals: async (): Promise<GoalsResponse> => {
        const response = await apiClient.get<GoalsResponse>("/savings/goals");
        return response.data;
    },

    /**
     * Create a new goal
     */
    createGoal: async (data: Omit<Goal, "id" | "user_id" | "created_at" | "saved_amount">): Promise<Goal> => {
        const response = await apiClient.post<Goal>("/savings/goals", data);
        return response.data;
    },

    /**
     * Add money to a goal
     */
    addMoney: async (id: number, amount: number): Promise<Goal> => {
        const response = await apiClient.post<Goal>(`/savings/goals/${id}/add`, { amount });
        return response.data;
    },

    /**
     * Delete a goal
     */
    deleteGoal: async (id: number): Promise<{ success: boolean }> => {
        const response = await apiClient.delete<{ success: boolean }>(`/savings/goals/${id}`);
        return response.data;
    }
};
