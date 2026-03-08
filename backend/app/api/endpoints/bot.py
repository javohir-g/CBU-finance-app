from aiogram import Bot, Dispatcher, types, Router, F
from aiogram.filters import Command
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from fastapi import APIRouter, Request
from app.core.config import settings

router = APIRouter()
bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
dp = Dispatcher()

bot_router = Router()

@bot_router.message(Command("start"))
async def start_handler(message: types.Message):
    """
    Handler for /start command.
    Welcomes the user and provides a button to open the Mini App.
    """
    welcome_text = (
        f"👋 Привет, {message.from_user.first_name}!\n\n"
        "Добро пожаловать в **CBU Finance** — твой личный помощник по управлению финансами прямо в Telegram.\n\n"
        "💳 Управляй картами\n"
        "📊 Отслеживай расходы\n"
        "📈 Планируй накопления\n\n"
        "Нажми на кнопку ниже, чтобы открыть приложение!"
    )
    
    # Create the WebApp button
    webapp_button = InlineKeyboardButton(
        text="💰 Открыть CBU Finance", 
        web_app=WebAppInfo(url=settings.WEBAPP_URL)
    )
    keyboard = InlineKeyboardMarkup(inline_keyboard=[[webapp_button]])
    
    await message.answer(welcome_text, reply_markup=keyboard, parse_mode="Markdown")

dp.include_router(bot_router)

@router.post("/webhook")
async def telegram_webhook(request: Request):
    """
    FastAPI endpoint to receive Telegram updates via Webhook.
    """
    update = types.Update.model_validate(await request.json(), context={"bot": bot})
    await dp.feed_update(bot, update)
    return {"ok": True}
