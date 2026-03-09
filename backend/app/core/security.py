import hmac
import hashlib
import json
import urllib.parse
from datetime import datetime
from typing import Optional, Dict, Any
from jose import jwt
from app.core.config import settings

def verify_telegram_init_data(init_data: str, max_age_seconds: int = 3600) -> Optional[Dict[str, Any]]:
    """
    Verifies the data received from the Telegram WebApp.
    Returns the user data if valid, None otherwise.
    """
    import time
    try:
        # Parse the query string
        parsed_data = dict(urllib.parse.parse_qsl(init_data, keep_blank_values=True))
        
        received_hash = parsed_data.pop('hash', None)
        if not received_hash:
            return None
            
        auth_date = parsed_data.get('auth_date')
        if not auth_date:
            print("Missing auth_date")
            return None
            
        try:
            auth_ts = int(auth_date)
            if time.time() - auth_ts > max_age_seconds:
                print("initData expired")
                return None
        except ValueError:
            print("Invalid auth_date format")
            return None
        
        # Sort keys and create data-check-string
        # Telegram requires parameters to be sorted alphabetically
        data_check_string = "\n".join([f"{k}={v}" for k, v in sorted(parsed_data.items(), key=lambda x: x[0])])
        
        # Create secret key from bot token using HMAC-SHA256 with "WebAppData"
        secret_key = hmac.new(
            b"WebAppData",
            settings.TELEGRAM_BOT_TOKEN.encode(),
            hashlib.sha256
        ).digest()
        
        # Create HMAC-SHA256 signature
        computed_hash = hmac.new(
            secret_key,
            data_check_string.encode(),
            hashlib.sha256
        ).hexdigest()
        
        # Check signature using compare_digest
        if not hmac.compare_digest(computed_hash.lower(), received_hash.lower()):
            print("Hash mismatch")
            return None
            
        # Extract user data if present
        user_data = {}
        if 'user' in parsed_data:
            user_data = json.loads(parsed_data['user'])
            print(f"Verified user_data: {user_data}")
        else:
            # Fallback for data without 'user' field, try to find user fields in parsed_data
            user_data = parsed_data
            print("No 'user' field found in parsed_data, using raw data as user_data")
            
        return user_data
    except Exception as e:
        print(f"Verification error in security.py: {e}")
        import traceback
        traceback.print_exc()
        return None

def create_access_token(data: dict) -> str:
    """Creates a JWT access token."""
    to_encode = data.copy()
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def decode_access_token(token: str) -> Optional[dict]:
    """Decodes a JWT access token."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except Exception:
        return None
