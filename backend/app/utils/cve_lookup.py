import requests

from app.utils.epss_lookup import get_epss
from app.ai.risk_engine import calculate_risk


NVD_API = "https://services.nvd.nist.gov/rest/json/cves/2.0"


def find_cves(service: str, version: str = "", port: int = 0):
    """
    Search the NVD for CVEs related to a service and version.
    """

    keyword = service

    if version:
        keyword += f" {version}"

    try:
        response = requests.get(
            NVD_API,
            params={
                "keywordSearch": keyword,
                "resultsPerPage": 5
            },
            timeout=20
        )

        response.raise_for_status()

        data = response.json()

        results = []

        for item in data.get("vulnerabilities", []):

            cve = item["cve"]

            metrics = cve.get("metrics", {})

            cvss = 0
            severity = "Unknown"

            if "cvssMetricV31" in metrics:

                metric = metrics["cvssMetricV31"][0]

                cvss = metric["cvssData"]["baseScore"]
                severity = metric["cvssData"]["baseSeverity"]

            elif "cvssMetricV30" in metrics:

                metric = metrics["cvssMetricV30"][0]

                cvss = metric["cvssData"]["baseScore"]
                severity = metric["cvssData"]["baseSeverity"]

            elif "cvssMetricV2" in metrics:

                metric = metrics["cvssMetricV2"][0]

                cvss = metric["cvssData"]["baseScore"]
                severity = metric.get("baseSeverity", "Unknown")

            description = ""

            descriptions = cve.get("descriptions", [])

            for desc in descriptions:

                if desc["lang"] == "en":
                    description = desc["value"]
                    break

            # Get EPSS score
            epss = get_epss(cve["id"])

            # AI Risk Calculation
            risk = calculate_risk(
                cvss=cvss,
                epss=epss,
                service=service,
                port=port
            )

            results.append({
                "cve": cve["id"],
                "cvss": cvss,
                "severity": severity,
                "epss": epss,
                "priority": risk["priority"],
                "risk_score": risk["risk_score"],
                "action": risk["action"],
                "exposure_score": risk["exposure_score"],
                "description": description
            })

        return results

    except Exception as e:

        print(e)

        return []