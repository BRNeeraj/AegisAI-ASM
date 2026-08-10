from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

from app.core.config import settings

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    print("TOKEN RECEIVED:", token)

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        print("PAYLOAD:", payload)
        return payload

    except JWTError as e:
        print("JWT ERROR:", repr(e))
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )