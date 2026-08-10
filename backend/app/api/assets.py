from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.asset import AssetCreate
from app.services.asset_service import AssetService

router = APIRouter(
    prefix="/assets",
    tags=["Asset Discovery"]
)


@router.post("/discover")
def discover_asset(
    asset: AssetCreate,
    db: Session = Depends(get_db)
):
    try:
        result = AssetService.discover(
            db,
            asset.domain
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )