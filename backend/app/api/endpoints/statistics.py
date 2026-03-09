from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, timedelta
from app.db.session import get_db
from app.models.models import Transaction, User
from app.api.endpoints.user import get_current_user

router = APIRouter()

@router.get("/")
def get_statistics(
    period: str = "month",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Calculate start date based on period
    end_date = datetime.utcnow()
    if period == "today":
        start_date = end_date.replace(hour=0, minute=0, second=0, microsecond=0)
    elif period == "week":
        start_date = end_date - timedelta(days=7)
    elif period == "month":
        start_date = end_date - timedelta(days=30)
    elif period == "year":
        start_date = end_date - timedelta(days=365)
    else: # all
        start_date = datetime(2000, 1, 1)

    # Get transactions in period
    transactions = db.query(Transaction).filter(
        Transaction.user_id == current_user.id,
        Transaction.created_at >= start_date
    ).all()

    total_income = sum(t.amount for t in transactions if t.type == "received")
    total_expense = sum(t.amount for t in transactions if t.type == "sent")

    # Group by category
    def group_by_category(type_filter: str):
        cat_stats = {}
        type_total = 0
        filtered_trans = [t for t in transactions if t.type == type_filter]
        
        for t in filtered_trans:
            cat_stats[t.category] = cat_stats.get(t.category, 0) + t.amount
            type_total += t.amount
            
        result = []
        for cat, amount in cat_stats.items():
            result.append({
                "category": cat,
                "amount": amount,
                "percentage": round((amount / type_total * 100), 1) if type_total > 0 else 0,
                "count": len([t for t in filtered_trans if t.category == cat])
            })
        return sorted(result, key=lambda x: x["amount"], reverse=True)

    return {
        "totalIncome": total_income,
        "totalExpense": total_expense,
        "expenseByCategory": group_by_category("sent"),
        "incomeByCategory": group_by_category("received"),
        "period": period
    }
