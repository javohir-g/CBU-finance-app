from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import User
from app.schemas.schemas import TelegramLoginRequest, AuthResponse, AuthUser
from app.core.security import verify_telegram_init_data, create_access_token

router = APIRouter()

@router.post("/telegram", response_model=AuthResponse)
def login_telegram(request: TelegramLoginRequest, authorization: str | None = Header(default=None), db: Session = Depends(get_db)):
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Authorization header")

    try:
        auth_type, init_data_raw = authorization.split(" ", 1)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Authorization header")

    if auth_type.lower() != "tma":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unsupported auth type")

    # Verify Telegram data
    user_data = verify_telegram_init_data(init_data_raw)
    
    if not user_data:
        print(f"VERIFICATION FAILED for data: {init_data_raw[:50]}...")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Telegram data"
        )
    
    print(f"User data from Telegram: {user_data}")
    
    # Correctly identify telegram_id (can be 'id' in Telegram JSON)
    telegram_id = user_data.get("id") or user_data.get("telegram_id")
    if not telegram_id:
        print("Missing id in user_data")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing telegram_id in user data"
        )
    
    # Check if user exists
    user = db.query(User).filter(User.telegram_id == telegram_id).first()
    is_new_user = False
    
    avatar_url = user_data.get("photo_url")
    user_name = f"{user_data.get('first_name', '')} {user_data.get('last_name', '')}".strip() or "User"
    username = user_data.get("username")
    language = user_data.get("language_code", "rus")
    
    if not user:
        is_new_user = True
        user = User(
            telegram_id=telegram_id,
            name=user_name,
            username=username,
            avatar=avatar_url,
            language=language,
            theme=request.colorScheme
        )
        db.add(user)
    else:
        user.name = user_name
        user.username = username
        user.avatar = avatar_url
        user.language = language
        user.theme = request.colorScheme

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
            avatar=user.avatar,
            phone=user.phone
        ),
        is_new_user=is_new_user
    )
