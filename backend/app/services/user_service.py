from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.security.hash import hash_password, verify_password
from app.security.jwt import create_access_token


class UserService:

    @staticmethod
    def register(db: Session, username, email, password):

        existing = UserRepository.get_by_email(db, email)

        if existing:
            raise Exception("Email already exists")

        user = User(
            username=username,
            email=email,
            password=hash_password(password)
        )

        return UserRepository.create(db, user)

    @staticmethod
    def login(db: Session, email, password):

        user = UserRepository.get_by_email(db, email)

        if not user:
            raise Exception("Invalid email or password")

        if not verify_password(password, user.password):
            raise Exception("Invalid email or password")

        token = create_access_token(
            {"sub": user.email}
        )

        return token