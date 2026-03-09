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
        const response = await apiClient.get<any>("/cards");
        const cards = (response.data.cards || []).map((c: any) => ({
            ...c,
            name: c.cardholder_name || "Card",
            number: c.card_number || "0000",
            type: c.card_type || "visa",
            status: c.is_locked ? "locked" : c.is_deactivated ? "deactivated" : "active"
        }));
        return { cards, total: response.data.total || 0 };
    },

    /**
     * Add a new card
     */
    addCard: async (data: { cardholder_name: string; card_number: string; expiry_date: string; cvv: string; balance?: number }): Promise<Card> => {
        const response = await apiClient.post<any>("/cards", data);
        const c = response.data;
        return {
            ...c,
            name: c.cardholder_name || "Card",
            number: c.card_number || "0000",
            type: c.card_type || "visa",
            status: c.is_locked ? "locked" : c.is_deactivated ? "deactivated" : "active"
        };
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
