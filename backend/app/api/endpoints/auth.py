from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import User
from app.schemas.schemas import TelegramLoginRequest, AuthResponse, AuthUser
from app.core.security import verify_telegram_init_data, create_access_token

router = APIRouter()

@router.post("/telegram", response_model=AuthResponse)
def login_telegram(request: TelegramLoginRequest, db: Session = Depends(get_db)):
    # Verify Telegram data
    user_data = verify_telegram_init_data(request.initData)
    
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Telegram data"
        )
    
    telegram_id = user_data.get("id")
    if not telegram_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing telegram_id in user data"
        )
    
    # Check if user exists
    user = db.query(User).filter(User.telegram_id == telegram_id).first()
    is_new_user = False
    
    if not user:
        is_new_user = True
        user = User(
            telegram_id=telegram_id,
            name=f"{user_data.get('first_name', '')} {user_data.get('last_name', '')}".strip() or "User",
            username=user_data.get("username"),
            avatar=user_data.get("photo_url"),
            language="rus",
            theme="dark"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Create JWT token
    token = create_access_token({"sub": str(user.id)})
    
    return AuthResponse(
        success=True,
        token=token,
        user=AuthUser(
            id=user.id,
            name=user.name,
            username=user.username,
            avatar=user.avatar
        ),
        is_new_user=is_new_user
    )
