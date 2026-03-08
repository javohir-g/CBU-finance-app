import hmac
import hashlib
import json
import urllib.parse
from datetime import datetime
from typing import Optional, Dict, Any
from jose import jwt
from app.core.config import settings

def verify_telegram_init_data(init_data: str) -> Optional[Dict[str, Any]]:
    """
    Verifies the data received from the Telegram WebApp.
    Returns the user data if valid, None otherwise.
    """
    try:
        # Parse the query string
        parsed_data = dict(urllib.parse.parse_qsl(init_data))
        
        if 'hash' not in parsed_data:
            return None
        
        received_hash = parsed_data.pop('hash')
        
        # Sort keys and create data-check-string
        data_check_string = "\n".join([f"{k}={v}" for k, v in sorted(parsed_data.items())])
        
        # Create secret key from bot token
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
        
        # Check signature
        if computed_hash != received_hash:
            return None
            
        # Extract user data
        if 'user' in parsed_data:
            return json.loads(parsed_data['user'])
            
        return parsed_data
    except Exception as e:
        print(f"Verification error: {e}")
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
