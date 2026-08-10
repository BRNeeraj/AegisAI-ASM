from pydantic import BaseModel


class AssetCreate(BaseModel):
    domain: str


class AssetResponse(BaseModel):
    id: int
    domain: str
    ip_address: str | None = None
    registrar: str | None = None
    whois_data: str | None = None
    dns_records: str | None = None

    class Config:
        from_attributes = True