# ☕ HolidayBrew

HolidayBrew is a full-stack coffee shop web application built using **FastAPI**, **Jinja2**, **SQLAlchemy**, and **PostgreSQL/SQLite**. The project combines a modern backend API with a responsive frontend experience for browsing coffee products, managing carts, and simulating an online coffee ordering platform.

The platform is inspired by a festive premium coffee brand experience with seasonal blends, brewing kits, and holiday-themed products.

---

# ✨ Features

## Frontend
- Responsive coffee shop website
- Product browsing page
- Shopping cart functionality
- Checkout page
- Order success page
- Event page
- Static assets using HTML, CSS, and JavaScript

## Backend API
- REST API built with FastAPI
- CRUD operations for products
- Product availability management
- Product pricing updates
- Product statistics endpoint
- Health monitoring endpoint
- Database initialization with sample coffee products

## Database
- SQLAlchemy ORM integration
- PostgreSQL support for production
- SQLite fallback for local development
- Connection pooling support

---

# 🛠️ Tech Stack

## Backend
- FastAPI
- SQLAlchemy
- Uvicorn
- Pydantic
- Python Dotenv

## Frontend
- HTML
- CSS
- JavaScript
- Jinja2 Templates

## Database
- PostgreSQL
- SQLite

## Deployment
- Railway

---

# 📂 Project Structure

```bash
HolidayBrew/
│
├── main.py                 # Main FastAPI application
├── database.py             # Database configuration
├── database_models.py      # SQLAlchemy models
├── models.py               # Pydantic schemas
├── requirements.txt        # Python dependencies
├── create_database.py      # Database initialization script
│
├── templates/              # HTML templates
│   ├── index.html
│   ├── coffee.html
│   ├── cart.html
│   ├── checkout.html
│   ├── event.html
│   └── order_success.html
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
└── railway.json            # Railway deployment config
```

---

# 🚀 Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Friendlycuber12/HolidayBrew.git
cd HolidayBrew
```

## 2. Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

#### Windows
```bash
venv\Scripts\activate
```

#### macOS/Linux
```bash
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=sqlite:///./holidaybrew.db
API_TITLE=Holiday Brew API
API_VERSION=1.0.0
ALLOWED_ORIGINS=http://localhost:8000
```

For PostgreSQL:

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

---

## 5. Run the Application

```bash
uvicorn main:app --reload
```

Server will start at:

```bash
http://127.0.0.1:8000
```

---

# 📘 API Documentation

FastAPI automatically generates API documentation.

## Swagger UI
```bash
http://127.0.0.1:8000/docs
```

## ReDoc
```bash
http://127.0.0.1:8000/redoc
```

---

# 🔌 Main API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | API root |
| GET | `/health` | Health check |
| GET | `/products` | Get all products |
| GET | `/products/{id}` | Get product by ID |
| POST | `/products` | Create new product |
| PUT | `/products/{id}` | Update product |
| PATCH | `/products/{id}/availability` | Update availability |
| PATCH | `/products/{id}/price` | Update price |
| PATCH | `/products/{id}/name` | Update name |
| DELETE | `/products/{id}` | Delete product |
| GET | `/products/stats/count` | Product statistics |

---

# ☕ Sample Products

The database initializes with products such as:

- Espresso Deluxe
- Holiday Blend
- Ethiopian Single Origin
- Nitro Cold Brew
- French Press Kit
- Coffee Subscription Box
- Barista Starter Kit

---

# 🌐 Deployment

This project is configured for deployment on Railway.

To deploy:

1. Push repository to GitHub
2. Connect repository to Railway
3. Add environment variables
4. Deploy automatically

---

# 📈 Future Improvements

- User authentication
- Payment gateway integration
- Order history system
- Admin dashboard
- Product image uploads
- Inventory management
- Email notifications
- AI-based coffee recommendations

---

# 👨‍💻 Author

Developed by **Keshav Soni**

---

# 📄 License

This project is built for educational and portfolio purposes.
