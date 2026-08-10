def get_exposure_score(service: str, port: int):
    """
    Assign exposure score based on service.
    """

    service = service.lower()

    if port in [22, 80, 443]:
        return 10

    elif port in [3389, 445]:
        return 15

    elif port in [21, 25]:
        return 8

    elif port in [53]:
        return 6

    return 3