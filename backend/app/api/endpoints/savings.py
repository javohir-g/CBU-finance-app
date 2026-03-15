from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models.models import SavingsGoal, User, Card, Transaction
from app.schemas.schemas import SavingsGoalRead, SavingsGoalCreate, SavingsGoalUpdate, GoalTopUp
from app.api.endpoints.user import get_current_user

router = APIRouter()

@router.get("/goals")
def get_goals(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goals = db.query(SavingsGoal).filter(SavingsGoal.user_id == current_user.id).all()
    return {"goals": goals, "total": len(goals)}

@router.post("/goals", response_model=SavingsGoalRead)
def create_goal(
    goal_in: SavingsGoalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_goal = SavingsGoal(
        user_id=current_user.id,
        name=goal_in.name,
        target_amount=goal_in.target_amount,
        saved_amount=0.0,
        icon=goal_in.icon,
        color=goal_in.color,
        deadline=goal_in.deadline,
        partner_name=goal_in.partner_name,
        is_shared=goal_in.is_shared
    )
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return new_goal

@router.post("/goals/{goal_id}/add", response_model=SavingsGoalRead)
def add_money_to_goal(
    goal_id: int,
    top_up: GoalTopUp,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(SavingsGoal).filter(SavingsGoal.id == goal_id, SavingsGoal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    amount = top_up.amount
    card_id = top_up.card_id
    
    if card_id:
        card = db.query(Card).filter(Card.id == card_id, Card.user_id == current_user.id).first()
        if not card:
            raise HTTPException(status_code=404, detail="Card not found")
        if card.balance < amount:
            raise HTTPException(status_code=400, detail="Insufficient funds on card")
        
        card.balance -= amount
        db.add(card)
        
        # Create a transaction record for this
        new_trans = Transaction(
            user_id=current_user.id,
            card_id=card_id,
            type="sent",
            category="Savings",
            amount=amount,
            currency=card.currency,
            recipient_name=f"Savings: {goal.name}",
            description=f"Top up goal: {goal.name}"
        )
        db.add(new_trans)
    
    goal.saved_amount += amount
    db.commit()
    db.refresh(goal)
    return goal

@router.delete("/goals/{goal_id}")
def delete_goal(
    goal_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goal = db.query(SavingsGoal).filter(SavingsGoal.id == goal_id, SavingsGoal.user_id == current_user.id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    db.delete(goal)
    db.commit()
    return {"success": True}
