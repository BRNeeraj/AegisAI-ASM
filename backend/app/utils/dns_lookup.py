import socket


def get_ip(domain: str):
    try:
        ip = socket.gethostbyname(domain)
        return ip
    except Exception:
        return None