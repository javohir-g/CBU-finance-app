from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "CBU Finance Backend"
    API_V1_STR: str = "/api"
    
    # Security
    SECRET_KEY: str = "7293e82b3d8f4c5e9a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 30  # 30 days for MVP

    # Telegram
    TELEGRAM_BOT_TOKEN: str = "8759802171:AAGq-PNZTrLT7VfpELhskq5y4oQZwhjDmmo"
    
    # Database
    DATABASE_URL: str = "sqlite:///./sql_app.db" # Default for MVP, can be overriden to PostgreSQL
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["*"]

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
