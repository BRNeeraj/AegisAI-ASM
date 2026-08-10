from app.ai.exposure_engine import get_exposure_score


def calculate_risk(cvss: float, epss: float, service: str, port: int):
    """
    AI Risk Calculation using:
    - CVSS
    - EPSS
    - Exposure Score
    """

    exposure = get_exposure_score(service, port)

    risk_score = (
        (cvss * 5)
        + (epss * 50)
        + exposure
    )

    risk_score = min(round(risk_score), 100)

    if risk_score >= 90:
        priority = "Critical"
        action = "Patch Immediately"

    elif risk_score >= 75:
        priority = "High"
        action = "Patch Within 24 Hours"

    elif risk_score >= 50:
        priority = "Medium"
        action = "Patch During Maintenance"

    else:
        priority = "Low"
        action = "Monitor"

    return {
        "priority": priority,
        "risk_score": risk_score,
        "action": action,
        "exposure_score": exposure
    }