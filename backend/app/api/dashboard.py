from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    return DashboardService.get_summary(db)

@router.get("/service-stats")
def service_statistics(
    db: Session = Depends(get_db)
):
    return DashboardService.get_service_statistics(db)
@router.get("/priority-stats")
def get_priority_statistics(
    db: Session = Depends(get_db)
):
    return DashboardService.get_priority_statistics(db)
@router.get("/recent-vulnerabilities")
def recent_vulnerabilities(
    db: Session = Depends(get_db)
):
    return DashboardService.get_recent_vulnerabilities(db)