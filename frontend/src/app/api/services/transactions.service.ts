import apiClient from "../client";

// ========================================
// 💸 TRANSACTIONS SERVICE
// ========================================

export type TransactionType = "received" | "sent";
export type CategoryType = "shopping" | "housing" | "transport" | "entertainment" | "food" | "salary" | "freelance" | "gifts";
export type DateFilterType = "all" | "today" | "week" | "month" | "year";

export interface Transaction {
    id: number;
    user_id: number;
    card_id: number;
    type: TransactionType;
    category: CategoryType;
    amount: number;
    currency: string;
    recipient_name: string;
    recipient_avatar?: string;
    description?: string;
    created_at: string;
}

export interface TransactionsResponse {
    transactions: Transaction[];
    total: number;
    has_more: boolean;
}

export interface TransactionsParams {
    category?: "all" | "income" | "expense";
    date_filter?: DateFilterType;
    limit?: number;
    offset?: number;
}

export const transactionsService = {
    /**
     * Get transactions history
     */
    getTransactions: async (params?: TransactionsParams): Promise<TransactionsResponse> => {
        const response = await apiClient.get<TransactionsResponse>("/transactions", { params });
        return response.data;
    },

    /**
     * Create a new transaction
     */
    createTransaction: async (data: Omit<Transaction, "id" | "user_id" | "created_at">): Promise<Transaction> => {
        const response = await apiClient.post<Transaction>("/transactions", data);
        return response.data;
    },
    /**
     * Internal/Phone transfer
     */
    transfer: async (data: { from_card_id: number; to_card_id?: number; to_phone?: string; amount: number; description?: string }): Promise<any> => {
        const response = await apiClient.post<any>("/transactions/transfer", data);
        return response.data;
    }
};
