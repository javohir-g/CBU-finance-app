from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Auth
class TelegramLoginRequest(BaseModel):
    colorScheme: str = "dark"

class AuthUser(BaseModel):
    id: int
    name: str
    username: Optional[str] = None
    avatar: Optional[str] = None
    phone: Optional[str] = None

class AuthResponse(BaseModel):
    success: bool
    token: str
    user: AuthUser
    is_new_user: bool = False

# User
class UserBase(BaseModel):
    name: str
    username: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    language: str = "rus"
    theme: str = "dark"

class UserRead(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    language: Optional[str] = None
    theme: Optional[str] = None

class UserBalance(BaseModel):
    totalBalance: float
    currency: str = "UZS"

# Card
class CardBase(BaseModel):
    cardholder_name: str
    full_card_number: str
    balance: float = 0.0
    currency: str = "UZS"
    card_type: str
    color: Optional[str] = None
    card_bg: Optional[str] = None

class CardRead(CardBase):
    id: int
    card_number: str
    is_locked: bool
    is_deactivated: bool
    created_at: datetime
    class Config:
        from_attributes = True

class CardCreate(BaseModel):
    cardholder_name: str
    card_number: str
    expiry_date: str
    balance: Optional[float] = 0.0
    color: Optional[str] = None
    card_bg: Optional[str] = None

# Transaction
class TransactionBase(BaseModel):
    card_id: int
    type: str
    category: str
    amount: float
    currency: str = "UZS"
    recipient_name: str
    recipient_avatar: Optional[str] = None
    description: Optional[str] = None

class TransactionRead(TransactionBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class TransactionCreate(TransactionBase):
    pass

class CardTransfer(BaseModel):
    from_card_id: int
    to_card_id: Optional[int] = None
    to_phone: Optional[str] = None
    amount: float
    description: Optional[str] = None

# Savings Goal
class SavingsGoalBase(BaseModel):
    name: str
    target_amount: float
    currency: str = "UZS"
    icon: Optional[str] = "car"
    color: Optional[str] = "#7c3aed"
    deadline: Optional[datetime] = None
    partner_name: Optional[str] = None
    is_shared: bool = False

class SavingsGoalRead(SavingsGoalBase):
    id: int
    user_id: int
    saved_amount: float
    created_at: datetime
    class Config:
        from_attributes = True

class SavingsGoalCreate(SavingsGoalBase):
    pass

class SavingsGoalUpdate(BaseModel):
    name: Optional[str] = None
    target_amount: Optional[float] = None
    saved_amount: Optional[float] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    deadline: Optional[datetime] = None

class GoalTopUp(BaseModel):
    amount: float
    card_id: Optional[int] = None
