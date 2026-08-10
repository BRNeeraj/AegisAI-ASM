from sqlalchemy.orm import Session

from app.models.asset import Asset
from app.repositories.asset_repository import AssetRepository

from app.utils.dns_lookup import get_ip
from app.utils.http_check import check_http
from app.utils.whois_lookup import get_whois
from app.utils.nmap_scan import scan_target


class AssetService:

    @staticmethod
    def discover(db: Session, domain: str):

        ip = get_ip(domain)

        http_info = check_http(domain)

        whois_info = get_whois(domain)

        # Nmap Scan
        nmap_result = scan_target(domain)

        asset = Asset(
            domain=domain,
            ip_address=ip,
            status="Active" if http_info["alive"] else "Inactive"
        )

        AssetRepository.create(db, asset)

        return {
            "domain": domain,
            "ip_address": ip,
            "status": asset.status,
            "http_status": http_info["status_code"],
            "whois": whois_info,
            "nmap": nmap_result
        }