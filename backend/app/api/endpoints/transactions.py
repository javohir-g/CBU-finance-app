from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models.models import Transaction, Card, User
from app.schemas.schemas import TransactionRead, TransactionCreate, CardTransfer
from app.api.endpoints.user import get_current_user

router = APIRouter()

@router.get("")
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

@router.post("", response_model=TransactionRead)
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

@router.post("/transfer")
def transfer_money(
    transfer_in: CardTransfer,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify source card
    from_card = db.query(Card).filter(Card.id == transfer_in.from_card_id, Card.user_id == current_user.id).first()
    if not from_card:
        raise HTTPException(status_code=404, detail="Source card not found")
    
    if from_card.balance < transfer_in.amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    
    # Target can be another own card OR a phone number
    recipient_name = "Transfer"
    if transfer_in.to_card_id:
        to_card = db.query(Card).filter(Card.id == transfer_in.to_card_id, Card.user_id == current_user.id).first()
        if not to_card:
            raise HTTPException(status_code=404, detail="Target card not found")
        to_card.balance += transfer_in.amount
        recipient_name = f"My Card (**** {to_card.card_number})"
        db.add(to_card)
    elif transfer_in.to_phone:
        # For demo, we just simulate sending to a phone
        recipient_name = transfer_in.to_phone
    else:
        raise HTTPException(status_code=400, detail="Target card or phone required")
    
    # Update source balance
    from_card.balance -= transfer_in.amount
    db.add(from_card)
    
    # Create transaction record
    new_trans = Transaction(
        user_id=current_user.id,
        card_id=transfer_in.from_card_id,
        type="sent",
        category="Transfer",
        amount=transfer_in.amount,
        currency=from_card.currency,
        recipient_name=recipient_name,
        description=transfer_in.description or "Internal transfer"
    )
    db.add(new_trans)
    db.commit()
    db.refresh(new_trans)
    return {"success": True, "transaction": new_trans}
