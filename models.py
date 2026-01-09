from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200, description="Product name")
    description: str = Field(..., min_length=1, max_length=1000, description="Product description")
    price: int = Field(..., gt=0, description="Product price (must be positive)")
    available: bool = Field(default=True, description="Product availability status")

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    # Model for updating a product (all fields optional)
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1, max_length=1000)
    price: Optional[int] = Field(None, gt=0)
    available: Optional[bool] = None

class Product(ProductBase):
    # Complete product model with ID (for responses)
    id: int = Field(..., description="Product ID")
    
    model_config = ConfigDict(from_attributes=True)  # Allows Pydantic to read SQLAlchemy models

class ProductResponse(Product):
    # Response model for product operations
    pass

# Additional models for specific operations
class AvailabilityUpdate(BaseModel):
    #Model for updating availability
    available: bool

class PriceUpdate(BaseModel):
    # Model for updating price
    price: int = Field(..., gt=0, description="New price (must be positive)")

class NameUpdate(BaseModel):
    # Model for updating name
    name: str = Field(..., min_length=1, max_length=200, description="New product name")