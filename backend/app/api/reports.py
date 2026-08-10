from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.report_service import ReportService

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/summary")
def report_summary(db: Session = Depends(get_db)):
    return ReportService.summary(db)

@router.get("/ai-summary")
def ai_summary(db: Session = Depends(get_db)):
    return ReportService.ai_summary(db)

@router.get("/compliance/{framework}")
def compliance_report(
    framework: str,
    db: Session = Depends(get_db)
):
    return ReportService.compliance(
        db,
        framework
    )