from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, func
from database import Base
from datetime import datetime

class Product(Base):
    __tablename__ = "products"

    # Primary key
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Product information
    name = Column(String(200), nullable=False, index=True)
    description = Column(String(1000), nullable=False)
    price = Column(Integer, nullable=False)
    available = Column(Boolean, default=True, nullable=False, index=True)
    
    # Timestamps for tracking
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # In database_models.py
    image_url = Column(String(500), nullable=True)
    
    def __repr__(self):
        # String representation of Product
        return f"<Product(id={self.id}, name='{self.name}', price={self.price}, available={self.available})>"
    
    def to_dict(self):
        # Convert Product to dictionary
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "available": self.available,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }