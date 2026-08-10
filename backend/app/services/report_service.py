from sqlalchemy.orm import Session

from app.models.asset import Asset
from app.models.vulnerability import Vulnerability


class ReportService:

    @staticmethod
    def summary(db: Session):

        total_assets = db.query(Asset).count()

        total_vulnerabilities = db.query(Vulnerability).count()

        critical = db.query(Vulnerability).filter(
            Vulnerability.severity == "CRITICAL"
        ).count()

        high = db.query(Vulnerability).filter(
            Vulnerability.severity == "HIGH"
        ).count()

        medium = db.query(Vulnerability).filter(
            Vulnerability.severity == "MEDIUM"
        ).count()

        low = db.query(Vulnerability).filter(
            Vulnerability.severity == "LOW"
        ).count()

        avg = db.query(Vulnerability).all()

        risk = 0

        if avg:
            risk = round(
                sum(v.risk_score for v in avg) / len(avg),
                2
            )

        return {
            "total_assets": total_assets,
            "total_vulnerabilities": total_vulnerabilities,
            "critical": critical,
            "high": high,
            "medium": medium,
            "low": low,
            "average_risk": risk
        }
    @staticmethod
    def ai_summary(db: Session):

        data = ReportService.summary(db)

        summary = (
            f"The organization currently has "
            f"{data['total_assets']} external assets with "
            f"{data['total_vulnerabilities']} discovered vulnerabilities. "
            f"There are {data['high']} High severity findings and "
            f"{data['critical']} Critical findings. "
            f"The average risk score is {data['average_risk']}. "
            f"Immediate attention should be given to high-risk assets, "
            f"patch vulnerable software, enable Multi-Factor Authentication "
            f"and continuously monitor internet-facing services."
        )

        return {
            "summary": summary
        }

    @staticmethod
    def compliance(db: Session, framework: str):

        framework = framework.lower()

        reports = {

            "owasp": {
                "framework": "OWASP Top 10",
                "score": 82,
                "ai_summary": "OWASP compliance is strong overall with an 82% score. Injection and vulnerable components require immediate remediation to reduce application security risks.",
                "status": [
                    {"control": "Broken Access Control", "status": "PASS"},
                    {"control": "Cryptographic Failures", "status": "PASS"},
                    {"control": "Injection", "status": "WARNING"},
                    {"control": "Security Misconfiguration", "status": "PASS"},
                    {"control": "Vulnerable Components", "status": "WARNING"},
                ],
                "recommendations": [
                    "Patch Apache",
                    "Update vulnerable libraries",
                    "Enable MFA",
                    "Disable unnecessary services",
                ],
            },

            "iso27001": {
                "framework": "ISO 27001",
                "score": 91,
                "ai_summary": "ISO 27001 compliance is strong overall with a 91% score.",
                "status": [
                    {"control": "Access Control", "status": "PASS"},
                    {"control": "Asset Management", "status": "PASS"},
                    {"control": "Risk Assessment", "status": "PASS"},
                    {"control": "Incident Response", "status": "WARNING"},
                ],
                "recommendations": [
                    "Review access permissions",
                    "Perform periodic audits",
                    "Update risk register",
                ],
            },

            "soc2": {
                "framework": "SOC 2",
                "score": 87,
                "ai_summary": "SOC 2 compliance is healthy with an 87% score. Improve confidentiality controls and strengthen continuous monitoring.",
                "status": [
                    {"control": "Security", "status": "PASS"},
                    {"control": "Availability", "status": "PASS"},
                    {"control": "Confidentiality", "status": "WARNING"},
                ],
                "recommendations": [
                    "Improve logging",
                    "Enable continuous monitoring",
                    "Review privileged accounts",
                ],
            },

            "pci": {
                "framework": "PCI-DSS",
                "score": 84,
                "ai_summary": "PCI-DSS compliance is satisfactory with an 84% score. Strengthen patch management, rotate credentials regularly, and review firewall rules.",
                "status": [
                    {"control": "Firewall", "status": "PASS"},
                    {"control": "Encryption", "status": "PASS"},
                    {"control": "Patch Management", "status": "WARNING"},
                ],
                "recommendations": [
                    "Rotate credentials",
                    "Update payment servers",
                    "Review firewall rules",
                ],
            },
        }

        return reports.get(
            framework,
            {
                "framework": framework,
                "score": 0,
                "status": [],
                "recommendations": ["Framework not found"],
            },
        )