from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models.models import Transaction, Card, User
from app.schemas.schemas import TransactionRead, TransactionCreate
from app.api.endpoints.user import get_current_user

router = APIRouter()

@router.get("/")
def get_transactions(
    category: Optional[str] = "all",
    date_filter: Optional[str] = "all",
    limit: int = 50,
    offset: int = 0,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Transaction).filter(Transaction.user_id == current_user.id)
    
    if category != "all":
        query = query.filter(Transaction.category == category)
    
    total = query.count()
    transactions = query.order_by(Transaction.created_at.desc()).offset(offset).limit(limit).all()
    
    return {
        "transactions": transactions,
        "total": total,
        "has_more": (offset + limit) < total
    }

@router.post("/", response_model=TransactionRead)
def create_transaction(
    trans_in: TransactionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify card belongs to user
    card = db.query(Card).filter(Card.id == trans_in.card_id, Card.user_id == current_user.id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    
    # Update balance
    if trans_in.type == "sent":
        if card.balance < trans_in.amount:
            raise HTTPException(status_code=400, detail="Insufficient funds")
        card.balance -= trans_in.amount
    else:
        card.balance += trans_in.amount
        
    db.add(card)
    
    new_trans = Transaction(
        user_id=current_user.id,
        card_id=trans_in.card_id,
        type=trans_in.type,
        category=trans_in.category,
        amount=trans_in.amount,
        currency=trans_in.currency,
        recipient_name=trans_in.recipient_name,
        recipient_avatar=trans_in.recipient_avatar,
        description=trans_in.description
    )
    db.add(new_trans)
    db.commit()
    db.refresh(new_trans)
    return new_trans
