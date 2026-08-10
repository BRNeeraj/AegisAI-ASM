from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.asset import Asset
from app.models.vulnerability import Vulnerability


class DashboardRepository:

    @staticmethod
    def get_summary(db: Session):

        total_assets = db.query(func.count(Asset.id)).scalar()

        total_vulnerabilities = db.query(
            func.count(Vulnerability.id)
        ).scalar()

        critical = db.query(func.count(Vulnerability.id)).filter(
            Vulnerability.priority == "Critical"
        ).scalar()

        high = db.query(func.count(Vulnerability.id)).filter(
            Vulnerability.priority == "High"
        ).scalar()

        medium = db.query(func.count(Vulnerability.id)).filter(
            Vulnerability.priority == "Medium"
        ).scalar()

        low = db.query(func.count(Vulnerability.id)).filter(
            Vulnerability.priority == "Low"
        ).scalar()

        average_risk = db.query(
            func.avg(Vulnerability.risk_score)
        ).scalar()

        return {
            "total_assets": total_assets,
            "total_vulnerabilities": total_vulnerabilities,
            "critical": critical,
            "high": high,
            "medium": medium,
            "low": low,
            "average_risk_score": round(average_risk or 0, 2)
        }

    @staticmethod
    def get_service_statistics(db: Session):

        rows = (
            db.query(
                Vulnerability.service,
                func.count(Vulnerability.id)
            )
            .group_by(Vulnerability.service)
            .all()
        )

        return [
            {
                "service": service,
                "count": count
            }
            for service, count in rows
        ]
    @staticmethod
    def get_priority_statistics(db: Session):

        rows = (
            db.query(
                Vulnerability.priority,
                func.count(Vulnerability.id)
            )
            .group_by(Vulnerability.priority)
            .all()
        )

        return [
            {
                "priority": priority,
                "count": count
            }
            for priority, count in rows
        ]
    @staticmethod
    def get_recent_vulnerabilities(db: Session):

        rows = (
        db.query(Vulnerability)
        .order_by(Vulnerability.id.desc())
        .limit(10)
        .all()
    )

        return [
        {
            "id": row.id,
            "cve": row.cve,
            "service": row.service,
            "priority": row.priority,
            "risk_score": row.risk_score,
            "severity": row.severity,
            "cvss": row.cvss
        }
        for row in rows
    ]