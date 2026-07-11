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
- Render (backend + managed PostgreSQL, via `render.yaml` Blueprint)
- GitHub Actions (scheduled keep-alive ping to prevent free-tier cold starts)

---

# 📂 Project Structure

```bash
HolidayBrew/
│
├── main.py                     # Main FastAPI application
├── database.py                 # Database configuration
├── database_models.py          # SQLAlchemy models
├── models.py                   # Pydantic schemas
├── requirements.txt            # Python dependencies
├── create_database.py          # Local Postgres setup script (dev only)
│
├── templates/                  # HTML templates
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
├── render.yaml                 # Render deployment blueprint (web service + DB)
└── .github/
    └── workflows/
        └── keep-alive.yml      # Pings /health every 13 min to prevent sleep
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

Create a `.env` file for **local development**:

```env
DATABASE_URL=sqlite:///./holidaybrew.db
API_TITLE=Holiday Brew API
API_VERSION=1.0.0
ALLOWED_ORIGINS=http://localhost:8000
```

For local PostgreSQL instead of SQLite:

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

> **Note:** In production on Render, `DATABASE_URL` is injected automatically by the linked managed Postgres database defined in `render.yaml` — no manual `.env` setup needed there.

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

This project is deployed on **Render** using a Blueprint (`render.yaml`), which provisions both the FastAPI web service and a managed free-tier PostgreSQL database in one step.

To deploy:

1. Push the repository to GitHub (including `render.yaml`).
2. On [render.com](https://render.com), choose **New → Blueprint** and connect this repository.
3. Render reads `render.yaml` and creates the web service + database automatically, wiring `DATABASE_URL` between them.
4. Once live, copy the app's URL and add it as the `RENDER_APP_URL` secret in this repo's GitHub Actions settings, so the `keep-alive.yml` workflow can ping `/health` every 13 minutes and prevent the free-tier service from sleeping.

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
