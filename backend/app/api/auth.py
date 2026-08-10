from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.auth import UserRegister, UserLogin
from app.services.user_service import UserService
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    try:
        new_user = UserService.register(
            db,
            user.username,
            user.email,
            user.password
        )

        return {
            "message": "User created successfully",
            "id": new_user.id
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    try:
        token = UserService.login(
            db,
            user.email,
            user.password
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )


@router.get("/profile")
def profile(current_user=Depends(get_current_user)):
    return {
        "message": "Welcome to AegisAI ASM",
        "user": current_user
    }