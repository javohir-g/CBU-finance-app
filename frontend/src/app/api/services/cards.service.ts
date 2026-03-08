import apiClient from "../client";

// ========================================
// 💳 CARDS SERVICE
// ========================================

export type CardType = "visa" | "mastercard" | "uzcard" | "humo";
export type CardStatus = "active" | "locked" | "deactivated";

export interface Card {
    id: number;
    user_id: number;
    name: string;
    number: string;
    expiry: string;
    type: CardType;
    balance: number;
    currency: "USD" | "UZS";
    status: CardStatus;
    is_main: boolean;
    color?: string;
    created_at: string;
}

export interface CardsResponse {
    cards: Card[];
    total: number;
}

export const cardsService = {
    /**
     * Get all cards for current user
     */
    getCards: async (): Promise<CardsResponse> => {
        const response = await apiClient.get<CardsResponse>("/cards");
        return response.data;
    },

    /**
     * Add a new card
     */
    addCard: async (data: Omit<Card, "id" | "user_id" | "status" | "created_at" | "balance">): Promise<Card> => {
        const response = await apiClient.post<Card>("/cards", data);
        return response.data;
    },

    /**
     * Toggle card lock status
     */
    toggleLock: async (id: number): Promise<{ success: boolean; status: CardStatus }> => {
        const response = await apiClient.patch<{ success: boolean; status: CardStatus }>(`/cards/${id}/lock`);
        return response.data;
    },

    /**
     * Deactivate card
     */
    deactivateCard: async (id: number): Promise<{ success: boolean }> => {
        const response = await apiClient.delete<{ success: boolean }>(`/cards/${id}`);
        return response.data;
    }
};
