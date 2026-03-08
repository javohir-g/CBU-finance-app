from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base
import enum

class CardType(str, enum.Enum):
    visa = "visa"
    mastercard = "mastercard"
    uzcard = "uzcard"

class TransactionType(str, enum.Enum):
    received = "received"
    sent = "sent"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(Integer, unique=True, index=True)
    name = Column(String)
    username = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    language = Column(String, default="rus")
    theme = Column(String, default="dark")
    created_at = Column(DateTime, default=datetime.utcnow)

    cards = relationship("Card", back_populates="owner")
    transactions = relationship("Transaction", back_populates="user")
    savings_goals = relationship("SavingsGoal", back_populates="user")

class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    cardholder_name = Column(String)
    card_number = Column(String)  # Last 4
    full_card_number = Column(String) # Masked
    balance = Column(Float, default=0.0)
    currency = Column(String, default="USD")
    card_type = Column(String) # visa, mastercard, uzcard
    is_locked = Column(Boolean, default=False)
    is_deactivated = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="cards")
    transactions = relationship("Transaction", back_populates="card")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    card_id = Column(Integer, ForeignKey("cards.id"))
    type = Column(String) # received, sent
    category = Column(String)
    amount = Column(Float)
    currency = Column(String)
    recipient_name = Column(String)
    recipient_avatar = Column(String, nullable=True)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="transactions")
    card = relationship("Card", back_populates="transactions")

class SavingsGoal(Base):
    __tablename__ = "savings_goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    target_amount = Column(Float)
    saved_amount = Column(Float, default=0.0)
    icon = Column(String)
    color = Column(String)
    deadline = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="savings_goals")
