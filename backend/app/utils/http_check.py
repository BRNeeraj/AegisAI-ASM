import requests


def check_http(domain: str):

    # Try HTTPS first
    try:
        response = requests.get(
            f"https://{domain}",
            timeout=5,
            allow_redirects=True
        )

        return {
            "status_code": response.status_code,
            "alive": True
        }

    except Exception:
        pass

    # If HTTPS fails, try HTTP
    try:
        response = requests.get(
            f"http://{domain}",
            timeout=5,
            allow_redirects=True
        )

        return {
            "status_code": response.status_code,
            "alive": True
        }

    except Exception:
        return {
            "status_code": None,
            "alive": False
        }