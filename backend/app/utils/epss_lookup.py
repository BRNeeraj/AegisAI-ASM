import requests


EPSS_API = "https://api.first.org/data/v1/epss"


def get_epss(cve: str):
    try:
        response = requests.get(
            EPSS_API,
            params={"cve": cve},
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        if data["data"]:
            return float(data["data"][0]["epss"])

        return 0.0

    except Exception:
        return 0.0