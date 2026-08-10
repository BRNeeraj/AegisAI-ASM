import whois


def get_whois(domain: str):
    try:
        info = whois.whois(domain)

        creation = info.creation_date
        expiration = info.expiration_date

        # Some domains return a list of dates
        if isinstance(creation, list):
            creation = creation[0]

        if isinstance(expiration, list):
            expiration = expiration[0]

        return {
            "registrar": info.registrar,
            "creation_date": str(creation),
            "expiration_date": str(expiration)
        }

    except Exception:
        return None