from sqlalchemy.orm import Session

from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    @staticmethod
    def get_summary(db: Session):
        return DashboardRepository.get_summary(db)

    @staticmethod
    def get_service_statistics(db: Session):
        return DashboardRepository.get_service_statistics(db)

    @staticmethod
    def get_priority_statistics(db: Session):
        return DashboardRepository.get_priority_statistics(db)

    @staticmethod
    def get_recent_vulnerabilities(db: Session):
        return DashboardRepository.get_recent_vulnerabilities(db)