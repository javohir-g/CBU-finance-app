from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.models import Card, User
from app.schemas.schemas import CardRead, CardBase, CardCreate
from app.api.endpoints.user import get_current_user

router = APIRouter()

@router.get("/")
def get_cards(current_user: User = Depends(get_current_user)):
    cards = current_user.cards
    return {"cards": cards, "total": len(cards)}

@router.post("/", response_model=CardRead)
def create_card(
    card_in: CardCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # For MVP, we'll just mask the card number and save it
    last_4 = card_in.card_number[-4:]
    masked = f"•••• •••• •••• {last_4}"
    
    # Randomly assign card type for demo if not specified
    card_type = "visa"
    if card_in.card_number.startswith("4"): card_type = "visa"
    elif card_in.card_number.startswith("5"): card_type = "mastercard"
    elif card_in.card_number.startswith("8"): card_type = "uzcard"
    
    new_card = Card(
        user_id=current_user.id,
        cardholder_name=card_in.cardholder_name,
        card_number=last_4,
        full_card_number=masked,
        balance=1500.0, # Give some starting balance for demo
        currency="USD",
        card_type=card_type
    )
    db.add(new_card)
    db.commit()
    db.refresh(new_card)
    return new_card

@router.delete("/{card_id}")
def delete_card(
    card_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    card = db.query(Card).filter(Card.id == card_id, Card.user_id == current_user.id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    
    db.delete(card)
    db.commit()
    return {"success": True}
