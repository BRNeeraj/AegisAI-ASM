from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)

    domain = Column(String(255), unique=True, nullable=False)
    ip_address = Column(String(100))
    registrar = Column(String(255))
    whois_data = Column(String)
    dns_records = Column(String)
    status = Column(String(50))        

    created_at = Column(DateTime(timezone=True), server_default=func.now())