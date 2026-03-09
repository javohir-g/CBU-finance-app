from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth, user, cards, transactions, savings, statistics, bot as bot_api
from app.core.config import settings
from app.db.session import engine
from app.models import models
import os

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.on_event("startup")
async def on_startup():
    """
    On startup, set the Telegram webhook if RENDER_EXTERNAL_URL is set.
    """
    render_url = os.getenv("RENDER_EXTERNAL_URL")
    if render_url:
        webhook_url = f"{render_url}{settings.API_V1_STR}/bot/webhook"
        await bot_api.bot.set_webhook(webhook_url)
        print(f"Telegram webhook set to: {webhook_url}")

# Set up CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(user.router, prefix=f"{settings.API_V1_STR}/user", tags=["user"])
app.include_router(cards.router, prefix=f"{settings.API_V1_STR}/cards", tags=["cards"])
app.include_router(transactions.router, prefix=f"{settings.API_V1_STR}/transactions", tags=["transactions"])
app.include_router(savings.router, prefix=f"{settings.API_V1_STR}/savings", tags=["savings"])
app.include_router(statistics.router, prefix=f"{settings.API_V1_STR}/statistics", tags=["statistics"])
app.include_router(bot_api.router, prefix=f"{settings.API_V1_STR}/bot", tags=["bot"])

@app.get("/")
def root():
    return {"message": "CBU Finance API is running", "docs": "/docs"}
