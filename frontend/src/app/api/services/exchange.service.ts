import apiClient from "../client";

// ========================================
// 💱 EXCHANGE RATES SERVICE
// ========================================

export interface ExchangeRate {
    code: string;
    name: string;
    rate: number;
    diff: number;
    date: string;
}

export interface ExchangeRatesResponse {
    rates: ExchangeRate[];
    base: string;
    date: string;
}

export const exchangeService = {
    /**
     * Get current exchange rates
     */
    getRates: async (): Promise<ExchangeRatesResponse> => {
        const response = await apiClient.get<ExchangeRatesResponse>("/exchange-rates");
        return response.data;
    }
};
