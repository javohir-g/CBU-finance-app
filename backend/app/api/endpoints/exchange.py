from fastapi import APIRouter, HTTPException
import httpx
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

class ExchangeRate(BaseModel):
    code: str
    name: str
    rate: float
    diff: float
    date: str

class ExchangeRatesResponse(BaseModel):
    rates: List[ExchangeRate]
    base: str = "UZS"
    date: str

@router.get("", response_model=ExchangeRatesResponse)
async def get_exchange_rates():
    """
    Fetch actual exchange rates from Central Bank of Uzbekistan (CBU)
    """
    try:
        async with httpx.AsyncClient() as client:
            # CBU JSON API
            response = await client.get("https://cbu.uz/ru/arkhiv-kursov-valyut/json/")
            response.raise_for_status()
            data = response.json()
            
            # Format data to match our schema
            rates = []
            # We only care about main currencies for the app
            main_currencies = ["USD", "EUR", "RUB", "GBP", "JPY", "CNY", "KRW", "TRY"]
            
            current_date = ""
            if data:
                current_date = data[0].get("Date", "")

            for item in data:
                code = item.get("Ccy")
                if code in main_currencies:
                    rates.append(ExchangeRate(
                        code=code,
                        name=item.get("CcyNm_RU"),
                        rate=float(item.get("Rate")),
                        diff=float(item.get("Diff")),
                        date=item.get("Date")
                    ))
            
            return ExchangeRatesResponse(rates=rates, date=current_date)
            
    except Exception as e:
        print(f"Error fetching from CBU: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch exchange rates from CBU")
