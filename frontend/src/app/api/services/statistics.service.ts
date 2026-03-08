import apiClient from "../client";

// ========================================
// 📊 STATISTICS SERVICE
// ========================================

export interface CategoryStat {
    category: string;
    amount: number;
    percentage: number;
    count: number;
}

export interface StatisticsResponse {
    totalIncome: number;
    totalExpense: number;
    expenseByCategory: CategoryStat[];
    incomeByCategory: CategoryStat[];
    period: string;
}

export const statisticsService = {
    /**
     * Get statistics for a period
     */
    getStatistics: async (period: string = "month"): Promise<StatisticsResponse> => {
        const response = await apiClient.get<StatisticsResponse>("/statistics", { params: { period } });
        return response.data;
    }
};
