from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from models import Product, ProductCreate, ProductUpdate, AvailabilityUpdate, PriceUpdate, NameUpdate
from database import SessionLocal, engine, get_db
import database_models
from sqlalchemy.orm import Session
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from typing import List
import os
from dotenv import load_dotenv
import logging
from fastapi import Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from database import engine, Base

Base.metadata.create_all(bind=engine)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Create database tables
try:
    database_models.Base.metadata.create_all(bind=engine)
    logger.info("✓ Database tables created successfully")
except Exception as e:
    logger.error(f"✗ Failed to create database tables: {e}")
    raise

# Initialize FastAPI app
app = FastAPI(
    title=os.getenv("API_TITLE", "Holiday Brew API"),
    version=os.getenv("API_VERSION", "1.0.0"),
    description="API for Holiday Brew Coffee Shop - Premium Christmas Coffee",
)

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

# ============================================
# FRONTEND ROUTES
# ============================================
@app.get("/", tags=["Frontend"])
def serve_home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request}
    )
    
@app.get("/event", name="event", tags=["Frontend"])
def events(request: Request):
    return templates.TemplateResponse("event.html", {"request": request})


@app.get("/cart", name="cart", tags=["Frontend"])
def cart(request: Request):
    return templates.TemplateResponse("cart.html", {"request": request})

@app.get("/checkout", name="checkout", tags=["Frontend"])
def checkout(request: Request):
    return templates.TemplateResponse("checkout.html", {"request": request})

@app.get("/coffee", name="coffee", tags=["Frontend"])
def coffee(request: Request):
    return templates.TemplateResponse("coffee.html", {"request": request})

@app.get("/order_success", name="order-success", tags=["Frontend"])
def order_success(request: Request):
    return templates.TemplateResponse("order_success.html", {"request": request})

# CORS configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "https://holiday-brew.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

# Initial products data
initial_products = [
    {"name": "Espresso Deluxe", "description": "Rich, bold espresso blend with chocolate notes", "price": 349, "available": True},
    {"name": "Holiday Blend", "description": "Seasonal blend with cinnamon and nutmeg", "price": 419, "available": True},
    {"name": "Ethiopian Single Origin", "description": "Fruity and floral with bright acidity", "price": 449, "available": True},
    {"name": "Dark Roast Supremo", "description": "Strong, smoky flavor for dark roast lovers", "price": 229, "available": True},
    {"name": "Medium Roast Classic", "description": "Balanced and smooth everyday coffee", "price": 299, "available": True},
    {"name": "Decaf Delight", "description": "Full flavor without the caffeine", "price": 319, "available": True},
    {"name": "Cold Brew Bottle", "description": "Smooth cold brew, ready to enjoy", "price": 999, "available": True},
    {"name": "Peppermint Mocha RTD", "description": "Festive peppermint mocha in a bottle", "price": 549, "available": True},
    {"name": "Vanilla Latte Can", "description": "Creamy vanilla latte on the go", "price": 379, "available": True},
    {"name": "Nitro Cold Brew", "description": "Nitrogen-infused for extra smoothness", "price": 289, "available": True},
    {"name": "French Press Kit", "description": "Complete brewing kit with instructions", "price": 2599, "available": True},
    {"name": "Coffee Grinder Pro", "description": "Burr grinder for perfect consistency", "price": 4499, "available": True},
    {"name": "Pour Over Set", "description": "Elegant pour-over brewing system", "price": 1999, "available": True},
    {"name": "Electric Milk Frother", "description": "Create café-quality foam at home", "price": 1599, "available": True},
    {"name": "Coffee Scale", "description": "Precision weighing for perfect ratios", "price": 1499, "available": True},
    {"name": "Ceramic Mug Set", "description": "Set of 4 handcrafted ceramic mugs", "price": 2999, "available": True},
    {"name": "Holiday Gift Box", "description": "Curated selection of our best blends", "price": 4999, "available": True},
    {"name": "Barista Starter Kit", "description": "Everything needed to brew like a pro", "price": 7999, "available": True},
    {"name": "Travel Coffee Set", "description": "Portable brewing for coffee lovers", "price": 3499, "available": True},
    {"name": "Coffee Subscription Box", "description": "Monthly delivery of exclusive blends", "price": 1599, "available": True},
]

def init_db():
    """Initialize database with products if empty"""
    db = SessionLocal()
    try:
        count = db.query(database_models.Product).count()
        if count == 0:
            for product_data in initial_products:
                db_product = database_models.Product(**product_data)
                db.add(db_product)
            db.commit()
            logger.info(f"✓ Database initialized with {len(initial_products)} products")
        else:
            logger.info(f"✓ Database already contains {count} products")
    except SQLAlchemyError as e:
        logger.error(f"✗ Database error during initialization: {e}")
        db.rollback()
        raise
    except Exception as e:
        logger.error(f"✗ Unexpected error initializing database: {e}")
        db.rollback()
        raise
    finally:
        db.close()

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    try:
        init_db()
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        # Don't crash the app, but log the error

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down Holiday Brew API")

# ============================================
# API ENDPOINTS
# ============================================

# Root endpoint
@app.get("/api", tags=["Root"])
async def root():
    return {
        "message": "Welcome to Holiday Brew API",
        "version": os.getenv("API_VERSION", "1.0.0"),
        "status": "operational",
        "docs": "/docs",
        "redoc": "/redoc",
        "endpoints": {
            "products": "/products",
            "health": "/health",
            "stats": "/products/stats/count"
        }
    }

# Health check with proper error handling
@app.get("/health", tags=["Health"])
async def health_check(db: Session = Depends(get_db)):
    """Check if API and database are healthy"""
    try:
        # Test database connection
        db.execute(text("SELECT 1"))
        
        # Get product count as additional health metric
        product_count = db.query(database_models.Product).count()
        
        return {
            "status": "healthy",
            "service": "Holiday Brew API",
            "database": "connected",
            "products_count": product_count
        }
    except SQLAlchemyError as e:
        logger.error(f"Database health check failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection failed"
        )
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

# Get all products with improved error handling
@app.get("/products", response_model=List[Product], tags=["Products"])
async def get_products(
    skip: int = 0,
    limit: int = 100,
    available_only: bool = False,
    db: Session = Depends(get_db)
):
    """
    Retrieve all products with optional filtering
    
    - **skip**: Number of products to skip (pagination)
    - **limit**: Maximum number of products to return
    - **available_only**: Filter only available products
    """
    try:
        query = db.query(database_models.Product)
        
        if available_only:
            query = query.filter(database_models.Product.available == True)
        
        products = query.offset(skip).limit(limit).all()
        return products
    except SQLAlchemyError as e:
        logger.error(f"Database error retrieving products: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve products"
        )

# Get product by id
@app.get("/products/{product_id}", response_model=Product, tags=["Products"])
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get a specific product by ID"""
    try:
        db_product = db.query(database_models.Product).filter(
            database_models.Product.id == product_id
        ).first()
        
        if not db_product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with id {product_id} not found"
            )
        return db_product
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error(f"Database error retrieving product {product_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve product"
        )

# Create new product
@app.post("/products", response_model=Product, status_code=status.HTTP_201_CREATED, tags=["Products"])
async def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    """Create a new product"""
    try:
        # Check if product with same name exists
        existing = db.query(database_models.Product).filter(
            database_models.Product.name == product.name
        ).first()
        
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product with name '{product.name}' already exists"
            )
        
        db_product = database_models.Product(**product.model_dump())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        logger.info(f"Created new product: {db_product.name}")
        return db_product
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error(f"Database error creating product: {e}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create product"
        )

# Update entire product
@app.put("/products/{product_id}", response_model=Product, tags=["Products"])
async def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_db)
):
    """Update a product (partial update allowed)"""
    try:
        db_product = db.query(database_models.Product).filter(
            database_models.Product.id == product_id
        ).first()
        
        if not db_product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with id {product_id} not found"
            )
        
        # Update only provided fields
        update_data = product_update.model_dump(exclude_unset=True)
        
        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields to update"
            )
        
        for field, value in update_data.items():
            setattr(db_product, field, value)
        
        db.commit()
        db.refresh(db_product)
        logger.info(f"Updated product {product_id}: {db_product.name}")
        return db_product
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error(f"Database error updating product {product_id}: {e}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update product"
        )

# Update product availability
@app.patch("/products/{product_id}/availability", response_model=Product, tags=["Products"])
async def update_availability(
    product_id: int,
    availability: AvailabilityUpdate,
    db: Session = Depends(get_db)
):
    """Update product availability status"""
    try:
        db_product = db.query(database_models.Product).filter(
            database_models.Product.id == product_id
        ).first()
        
        if not db_product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with id {product_id} not found"
            )
        
        db_product.available = availability.available
        db.commit()
        db.refresh(db_product)
        logger.info(f"Updated availability for product {product_id}: {availability.available}")
        return db_product
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error(f"Database error updating availability for product {product_id}: {e}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update product availability"
        )

# Update product price
@app.patch("/products/{product_id}/price", response_model=Product, tags=["Products"])
async def update_price(
    product_id: int,
    price_update: PriceUpdate,
    db: Session = Depends(get_db)
):
    """Update product price"""
    try:
        db_product = db.query(database_models.Product).filter(
            database_models.Product.id == product_id
        ).first()
        
        if not db_product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with id {product_id} not found"
            )
        
        db_product.price = price_update.price
        db.commit()
        db.refresh(db_product)
        logger.info(f"Updated price for product {product_id}: ${price_update.price}")
        return db_product
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error(f"Database error updating price for product {product_id}: {e}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update product price"
        )

# Update product name
@app.patch("/products/{product_id}/name", response_model=Product, tags=["Products"])
async def update_name(
    product_id: int,
    name_update: NameUpdate,
    db: Session = Depends(get_db)
):
    """Update product name"""
    try:
        db_product = db.query(database_models.Product).filter(
            database_models.Product.id == product_id
        ).first()
        
        if not db_product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with id {product_id} not found"
            )
        
        db_product.name = name_update.name
        db.commit()
        db.refresh(db_product)
        logger.info(f"Updated name for product {product_id}: {name_update.name}")
        return db_product
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error(f"Database error updating name for product {product_id}: {e}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update product name"
        )

# Delete product
@app.delete("/products/{product_id}", tags=["Products"])
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    """Delete a product"""
    try:
        db_product = db.query(database_models.Product).filter(
            database_models.Product.id == product_id
        ).first()
        
        if not db_product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with id {product_id} not found"
            )
        
        product_name = db_product.name
        db.delete(db_product)
        db.commit()
        logger.info(f"Deleted product {product_id}: {product_name}")
        
        return {
            "message": "Product deleted successfully",
            "id": product_id,
            "name": product_name
        }
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error(f"Database error deleting product {product_id}: {e}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete product"
        )

# Get product count
@app.get("/products/stats/count", tags=["Statistics"])
async def get_product_count(db: Session = Depends(get_db)):
    """Get product statistics"""
    try:
        total = db.query(database_models.Product).count()
        available = db.query(database_models.Product).filter(
            database_models.Product.available == True
        ).count()
        unavailable = total - available
        
        return {
            "total_products": total,
            "available": available,
            "unavailable": unavailable
        }
    except SQLAlchemyError as e:
        logger.error(f"Database error getting product count: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve product statistics"
        )