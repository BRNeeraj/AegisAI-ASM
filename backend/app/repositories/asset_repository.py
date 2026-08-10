from sqlalchemy.orm import Session

from app.models.asset import Asset


class AssetRepository:

    @staticmethod
    def create(db: Session, asset: Asset):
        db.add(asset)
        db.commit()
        db.refresh(asset)
        return asset

    @staticmethod
    def get_by_domain(db: Session, domain: str):
        return (
            db.query(Asset)
            .filter(Asset.domain == domain)
            .first()
        )