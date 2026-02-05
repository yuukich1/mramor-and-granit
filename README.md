# Mramor and Granit 🪨

A modern full-stack e-commerce platform for marble and granite products, featuring a FastAPI backend and Next.js 16 frontend with containerization support.

# 🏛️ Mramor and Granit: Premium E-commerce Platform

[![Stack: Next.js 16](https://img.shields.io/badge/Frontend-Next.js%2016-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Stack: FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![DevOps: Docker](https://img.shields.io/badge/DevOps-Docker-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)
[![Architecture: Clean](https://img.shields.io/badge/Architecture-Clean%20Layered-orange?style=flat-square)](#architecture-overview)

A high-end, production-ready e-commerce solution tailored for the natural stone industry. This platform features a blazing-fast **FastAPI** backend and a cutting-edge **Next.js 16** (React 19) frontend, delivering a seamless experience from product discovery to callback request.

[🚀 Мрамор и Гранит](https://samara-mig.ru)

---

## 💎 Project Highlights

* **Cutting-Edge Stack**: Next.js 16 + React 19 + Tailwind CSS 4.
* **Industrial Backend**: FastAPI with Async SQLAlchemy 2.0 and Unit of Work pattern.
* **Smart Notifications**: Real-time Telegram alerts for customer inquiries via `aiogram`.
* **DevOps First**: Fully containerized with optimized Docker images for development and production.

## Overview

This is a complete e-commerce platform built with:
- **Backend**: FastAPI-based REST API with PostgreSQL, supporting products, categories, authentication, file uploads, and Telegram notifications
- **Frontend**: Modern Next.js 16 application with React 19, TypeScript, Tailwind CSS 4, and responsive design
- **Containerization**: Docker and Docker Compose for easy deployment and development

## Features

### Core Features
- ✅ **Category Management**: Create, read, update, and delete product categories with descriptions
- ✅ **Product Management**: Full CRUD operations with filtering, pagination, and search functionality
- ✅ **Image Upload & Storage**: UUID-based file storage with automatic directory creation
- ✅ **User Authentication**: JWT-based registration and login with secure password hashing
- ✅ **Callback Requests**: Collect customer inquiries with automatic Telegram notifications
- ✅ **Admin Dashboard Access**: Protected endpoints requiring admin authentication

### Technical Features
- ✅ **Async Database Operations**: SQLAlchemy ORM with asyncpg for non-blocking database access
- ✅ **Structured Logging**: loguru with file rotation and retention policies
- ✅ **Clean Architecture**: Clear separation of concerns with layered architecture
- ✅ **Type Safety**: Full TypeScript support on frontend, Pydantic validation on backend
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **API Documentation**: Interactive Swagger UI and ReDoc documentation
- ✅ **Containerized**: Docker support for consistent development and deployment
- ✅ **Modern Stack**: Latest stable versions of all major dependencies

## Tech Stack

### Frontend

- **Framework**: Next.js 16.1.4 - React 19.2.3 with App Router and SSR/SSG
- **Language**: TypeScript 5 for type-safe development
- **Styling**: 
  - Tailwind CSS 4 - utility-first CSS framework
  - PostCSS 4 - CSS processing
  - class-variance-authority 0.7.1 - component pattern library
- **UI & Components**: 
  - Radix UI primitives for accessible components
  - Lucide React 0.562.0 - icon library
  - Motion 12.28.1 - animation library
  - clsx 2.1.1 and tailwind-merge 3.4.0 - className utilities
- **Data Validation**: Zod 4.3.6 for schema validation
- **HTTP Client**: Axios 1.13.2 for API requests
- **Development**: ESLint 9, TypeScript compiler, Next.js dev tools

### Backend

- **Framework**: FastAPI 0.128.0+ with async/await support
- **Database**: PostgreSQL with SQLAlchemy 2.0+ ORM
- **Async Driver**: asyncpg 0.31.0+ for non-blocking database access
- **Python**: 3.12 - 3.14
- **Authentication**: PyJWT 2.10.1 for JWT tokens, passlib 1.7.4 for password hashing
- **Validation**: Pydantic with extra types for enhanced validation
- **Logging**: loguru 0.7.3 for structured logging
- **File Upload**: FastAPI UploadFile with UUID-based naming
- **Notifications**: aiogram 3.24.0 for Telegram integration
- **Utilities**: python-dotenv 1.2.1, phonenumbers 9.0.22
- **Package Manager**: Poetry for dependency management

### DevOps & Deployment

- **Containerization**: Docker & Docker Compose
- **Base Images**: Python 3.14 slim for backend, Node.js LTS for frontend
- **Orchestration**: Docker Compose for local development and container coordination

## Project Structure

```
mramor-and-granit/
├── backend/                    # FastAPI REST API
│   ├── src/
│   │   ├── main.py                 # FastAPI application entry point
│   │   ├── config.py              # Configuration & logging setup
│   │   ├── dependencies.py        # FastAPI dependencies (UoW, Admin auth)
│   │   ├── models/                # SQLAlchemy ORM models
│   │   │   ├── base.py            # Base model with timestamps
│   │   │   ├── categories.py      # Category model
│   │   │   ├── products.py        # Product model
│   │   │   ├── users.py           # User model for authentication
│   │   │   ├── callback.py        # Callback request model
│   │   ├── repository/            # Data access layer
│   │   │   ├── categories.py      # Category repository
│   │   │   ├── products.py        # Product repository
│   │   │   ├── users.py           # User repository
│   │   │   ├── callback.py        # Callback repository
│   │   ├── routes/                # API endpoints
│   │   │   ├── categories.py      # Category endpoints
│   │   │   ├── products.py        # Product endpoints
│   │   │   ├── auth.py            # Authentication endpoints
│   │   │   ├── callback.py        # Callback endpoints
│   │   ├── schemas/               # Pydantic request/response models
│   │   │   ├── categories.py      # Category schemas
│   │   │   ├── products.py        # Product schemas
│   │   │   ├── users.py           # User schemas
│   │   │   ├── callback.py        # Callback schemas
│   │   ├── service/               # Business logic layer
│   │   │   ├── categories.py      # Category service
│   │   │   ├── products.py        # Product service
│   │   │   ├── auth.py            # Authentication service
│   │   │   ├── callback.py        # Callback service
│   │   ├── utils/                 # Utility functions
│   │   │   ├── connect.py         # Database connection
│   │   │   ├── repository.py      # Repository base classes
│   │   │   ├── unit_of_work.py    # Unit of work pattern
│   │   │   ├── tg_sender.py       # Telegram notifications
│   │   │   └── utils.py           # Helper functions
│   │   ├── static/                # Static files storage
│   │   │   └── products/          # Product images
│   │   └── logs/                  # Application logs
│   │       ├── app.log            # General logs (DEBUG+)
│   │       └── errors.log         # Error logs only
│   └── pyproject.toml             # Project dependencies and metadata
│
└── frontend/                   # Next.js Web Application
    ├── app/                        # Next.js app directory
    │   ├── layout.tsx              # Root layout component
    │   ├── page.tsx                # Home page
    │   └── globals.css             # Global styles
    ├── api/                        # API client layer
    │   └── callback.api.ts         # Callback API integration
    ├── components/                 # Reusable React components
    │   ├── about/                  # About section components
    │   │   ├── about.tsx           # Main about component
    │   │   ├── about-advantages.tsx # Advantages showcase
    │   │   ├── usServices.tsx      # Services integration
    │   │   └── serv-items-about.ts # Service items configuration
    │   ├── callback/               # Callback form section
    │   │   ├── callbackForm.tsx    # Form component
    │   │   ├── callbackContacts.tsx # Contact information
    │   │   ├── callbackSection.tsx # Section container
    │   │   └── tgBlock.tsx         # Telegram contact block
    │   ├── examples/               # Examples/gallery section
    │   │   ├── examples.tsx        # Examples container
    │   │   └── gallery-items.ts    # Gallery configuration
    │   ├── header/                 # Header and navigation
    │   │   ├── navbar.tsx          # Navigation bar component
    │   │   └── nav-items.ts        # Navigation items configuration
    │   ├── footer/                 # Footer section
    │   │   ├── footer.tsx          # Footer component
    │   │   └── services-items.ts   # Services items configuration
    │   ├── main/                   # Main content components
    │   │   └── hero.tsx            # Hero section
    │   ├── map/                    # Map integration
    │   │   ├── map.tsx             # Main map component
    │   │   ├── mapInfoDesktop.tsx  # Desktop map info panel
    │   │   ├── mapInfoMobile.tsx   # Mobile map info panel
    │   │   └── mapSkeleton.tsx     # Loading skeleton
    │   ├── products/               # Products section
    │   │   ├── productSection.tsx  # Products container
    │   │   ├── productGrid.tsx     # Products grid layout
    │   │   ├── productCard.tsx     # Individual product card
    │   │   ├── productModal.tsx    # Product detail modal
    │   │   └── skeleton/           # Loading skeletons
    │   │       ├── productSkeleton.tsx    # Grid skeleton
    │   │       └── productSkeletonCard.tsx # Card skeleton
    │   └── ui/                     # UI utility components
    │       ├── button.tsx          # Button component
    │       ├── card.tsx            # Card component
    │       └── utils.ts            # UI utilities
    ├── hooks/                      # Custom React hooks
    │   ├── useCallbackForm.ts      # Callback form logic
    │   ├── useCategories.ts        # Categories data fetching
    │   ├── useIsMobile.ts          # Mobile detection
    │   ├── useProduct.ts           # Product data management
    │   └── useYandexMap.ts         # Yandex Map integration
    ├── public/                     # Static public assets
    ├── schemes/                    # Validation schemas
    │   └── callback.schema.ts      # Callback validation schema
    ├── types/                      # TypeScript type definitions
    │   ├── callback.ts             # Callback types
    │   ├── category.ts             # Category types
    │   └── product.ts              # Product types
    ├── utils/                      # Utility functions
    │   ├── mapCategories.ts        # Category mapping utilities
    │   └── prodView.ts             # Product view utilities
    ├── package.json                # Project dependencies
    ├── tsconfig.json               # TypeScript configuration
    ├── next.config.ts              # Next.js configuration
    ├── postcss.config.mjs           # PostCSS configuration
    └── eslint.config.mjs            # ESLint configuration
```

## Installation

### Prerequisites

- **Docker** and **Docker Compose** (recommended for development)
- **OR** for local development:
  - Python 3.12+ with Poetry
  - Node.js 18+ or 20+
  - PostgreSQL 12+

### Quick Start with Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd mramor-and-granit
```

2. Create a `.env` file in the backend directory with your configuration:
```bash
DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/mramor_db
SECRET_KEY=your_super_secret_key_here
ALGORITHM=HS256
TG_API_KEY=your_telegram_bot_token
ADMIN_ID=your_telegram_admin_id
FRONTEND_HOST=http://localhost:3000
```

3. Start with Docker Compose:
```bash
docker-compose up --build
```

This will:
- Build and start PostgreSQL database
- Build and start FastAPI backend (http://localhost:8000)
- Build and start Next.js frontend (http://localhost:3000)

4. Stop containers:
```bash
docker-compose down
```

### Local Development Setup

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies with Poetry:
```bash
poetry install
```

3. Create `.env` file in backend directory:
```bash
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/mramor_db
SECRET_KEY=your_super_secret_key_here
ALGORITHM=HS256
TG_API_KEY=your_telegram_bot_token
ADMIN_ID=your_telegram_admin_id
FRONTEND_HOST=http://localhost:3000
```

4. Start the development server:
```bash
poetry run fastapi dev
```

The API will be available at `http://localhost:8000`

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The frontend will be available at `http://localhost:3000`

## Running the Application

### With Docker Compose (Recommended)

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Backend - Local Development

```bash
cd backend
poetry run fastapi dev
```

- **API**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Frontend - Local Development

```bash
cd frontend
npm run dev
```

- **App**: http://localhost:3000

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
```bash
cd backend
poetry install --no-dev
poetry run uvicorn src.main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Full interactive API documentation is available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### API Endpoints Summary

- `POST /auth/register` - User registration
  - Request: `UserCreateSchema` (username, password)
  - Response: Registered user details
  
- `POST /auth/login` - User login (Form data)
  - Params: `username`, `password`
  - Response: `access_token`, `refresh_token`, token type

### Categories (`/categories`)

- `POST /categories/` - Create a new category ⚠️ Admin only
  - Request: `CategoryCreateSchemas` (name, description)
  - Response: `CategorySchemas`
  
- `GET /categories/` - Get all categories with optional filters
  - Params: `name` (optional), `id` (optional)
  - Response: List of `CategorySchemas`
  
- `GET /categories/{category_id}` - Get specific category by ID
  - Response: `CategorySchemas`
  
- `PUT /categories/{category_id}` - Update category ⚠️ Admin only
  - Request: `CategoryUpdateSchemas`
  - Response: Updated `CategorySchemas`
  
- `DELETE /categories/{category_id}` - Delete category ⚠️ Admin only
  - Response: None

### Products (`/products`)

- `POST /products/` - Create a new product ⚠️ Admin only
  - Request: `ProductCreateSchemas` (name, description, price, category_id)
  - Response: `ProductSchema`
  
- `GET /products/` - Get all products with filtering and pagination
  - Params: `limit` (default 20), `page` (default 0), `name`, `id`, `price` - all optional
  - Response: List of `ProductSchema`
  
- `GET /products/{product_id}` - Get specific product with category info
  - Response: `ProductWithCategorySchema` or `ProductSchema`
  
- `PATCH /products/image/{id}` - Upload/update product image ⚠️ Admin only
  - Params: `file` (UploadFile, multipart form-data)
  - Response: Updated `ProductSchema` with image_url
  - Features: UUID-based filename, automatic directory creation, file type detection
  
- `GET /products/image/{image}` - Retrieve product image
  - Params: `image` (filename)
  - Response: File response (JPEG, PNG, etc.)
  
- `PUT /products/{product_id}` - Update product ⚠️ Admin only
  - Request: `ProductUpdateSchemas`
  - Response: Updated `ProductSchema`
  
- `DELETE /products/{product_id}` - Delete product ⚠️ Admin only
  - Response: None

### Callbacks (`/callback`)

- `POST /callback/` - Create callback request
  - Request: `CallbackCreateSchema` (fullname, phone_number, comment)
  - Response: `CallbackSchema`
  - Features: Automatic Telegram notification via background task
  
- `GET /callback/` - Get all callback requests ⚠️ Admin only
  - Params: `limit` (default 10), `page` (default 1)
  - Response: List of `CallbackSchema`
  
- `DELETE /callback/{callback_id}` - Delete callback request ⚠️ Admin only
  - Response: None

**Legend**: ⚠️ = Requires admin authentication

## Architecture Overview

### Layered Architecture Pattern

The application follows a clean, layered architecture with clear separation of concerns:

```
HTTP Requests
    ↓
┌─────────────────────────────────────┐
│         Routes Layer                │  FastAPI endpoint handlers
│  (HTTP requests validation)         │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│       Schemas Layer                 │  Pydantic validation models
│  (Request/Response validation)      │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│       Service Layer                 │  Business logic orchestration
│  (Business rules & logic)           │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│      Repository Layer               │  Database operations
│  (Data persistence)                 │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│       Models Layer                  │  SQLAlchemy ORM
│  (Database schema)                  │
└────────────────┬────────────────────┘
                 ↓
        PostgreSQL Database
```

### Design Patterns Used

1. **Unit of Work Pattern**: Manages database transactions and ensures data consistency
2. **Repository Pattern**: Abstracts database operations behind a clean interface
3. **Service Layer**: Contains business logic separate from HTTP concerns
4. **Dependency Injection**: FastAPI dependencies for database session management
5. **Async/Await**: All I/O operations are non-blocking
- **app/** - Next.js 13+ App Router with layout system
  - Handles routing and main page structure
  - Global styles and layout configuration
  
- **api/** - API client layer
  - Centralized API integration for callback requests
  
- **components/** - Organized by feature/domain
  - **about/** - About section with advantages and services showcase
  - **callback/** - Callback request form with Telegram integration
  - **examples/** - Gallery and examples showcase
  - **header/** - Navigation and branding components
  - **footer/** - Footer section with links and information
  - **main/** - Hero section and main content components
  - **map/** - Yandex Map integration with responsive info panels
  - **products/** - Product catalog with grid, cards, and modal details
  - **ui/** - Reusable UI primitives and utility components

- **hooks/** - Custom React hooks for data management
  - Form validation and submission
  - Data fetching and caching
  - Responsive detection
  - Map and product interactions

- **types/** - TypeScript type definitions
  - Type-safe data structures for API responses and components
  
- **utils/** - Utility functions
  - Data transformation and mapping
  - Product display utilities
  
- **schemes/** - Validation schemas
  - Zod or similar validation for form inputs

**Styling Approach**:
- Utility-first CSS with Tailwind
- Component-based styling patterns using class-variance-authority
- Responsive design with mobile-first approach
- Loading skeletons for better UX

**Key Features**:
- Server-side rendering with Next.js
- Responsive UI with mobile and desktop variants
- Accessible components using Radix UI primitives
- Type-safe development with TypeScript
- Product filtering and pagination
- Callback form with validation
- Yandex Map integration
**Key Features**:
- Server-side rendering with Next.js App Router
- Responsive UI with mobile and desktop variants
- Accessible components using Radix UI primitives
- Type-safe development with TypeScript
- Product filtering and pagination
- Callback form with Zod validation
- Yandex Map integration
- Loading states with skeleton screens
- Image optimization with Next.js Image component

### Backend Architecture

**Layered Architecture**:
The backend follows a clean, layered architecture pattern:
1. **Routes** - HTTP endpoint handlers (FastAPI)
2. **Schemas** - Pydantic models for request/response validation
3. **Service** - Business logic and orchestration
4. **Repository** - Database operations and queries
5. **Models** - SQLAlchemy ORM models
6. **Utils** - Helper functions and database utilities

**Key Components**:
- `main.py` - FastAPI application setup with CORS, route registration
- `config.py` - Configuration management and logging setup
- `dependencies.py` - FastAPI dependency injection (UnitOfWork, Admin auth)
- Unit of Work pattern for transaction management
- Async-first design with asyncpg for non-blocking database operations

## Configuration

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```bash
# Database Configuration
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/mramor_db

# Security & JWT
SECRET_KEY=your_super_secret_key_here_change_in_production
ALGORITHM=HS256

# Telegram Bot (for callback notifications)
TG_API_KEY=your_telegram_bot_token
ADMIN_ID=your_telegram_admin_id

# Frontend Configuration
FRONTEND_HOST=http://localhost:3000
```

### Environment Variable Descriptions

- `DATABASE_URL` - PostgreSQL connection string with asyncpg driver for async operations
- `SECRET_KEY` - Secret key for JWT token signing ⚠️ **Must be changed in production!**
- `ALGORITHM` - JWT algorithm (HS256 recommended)
- `TG_API_KEY` - Telegram bot API token (get from @BotFather)
- `ADMIN_ID` - Telegram chat ID to receive callback notifications
- `FRONTEND_HOST` - Frontend URL for CORS configuration

## Logging System

The application uses **loguru** for structured, professional logging:

### Log Files

Logs are stored in the `logs/` directory with automatic rotation and retention:

- **`app.log`** - General application logs (DEBUG and above)
  - Rotation: 10 MB per file
  - Retention: 7 days
  
- **`errors.log`** - Error-level logs only
  - Rotation: 10 MB per file
  - Retention: 30 days

### Log Levels

| Level | Usage | Examples |
|-------|-------|----------|
| `DEBUG` | Detailed information for development | Router initialization, database operations |
| `INFO` | General informational messages | Application startup, successful operations |
| `WARNING` | Potentially problematic situations | Deprecated features, unusual conditions |
| `ERROR` | Error messages for failed operations | Database errors, validation failures |
| `CRITICAL` | Critical system errors | Fatal failures, system shutdown |

### Example Log Entries

```
2026-01-21 14:30:45 | INFO  | main:startup_event - Application startup - API is ready
2026-01-21 14:31:02 | DEBUG | routes.products:create - POST /products - Creating: "Marble"
2026-01-21 14:31:03 | INFO  | service.products:create - Creating new product
2026-01-21 14:31:06 | INFO  | service.callback:create - Telegram notification queued
2026-01-21 14:35:10 | ERROR | service.products:update - Product 999 not found
```

### Monitoring Logs in Development

```bash
# Watch main application log
tail -f logs/app.log

# Watch error logs
tail -f logs/errors.log

# Search for specific patterns
grep "ERROR" logs/app.log
grep "product" logs/app.log
grep "callback" logs/app.log

# Watch specific service logs
grep "products\|categories\|auth" logs/app.log
```

## Security & Best Practices

### Authentication & Authorization

- **JWT Tokens**: Stateless authentication using JWT with HS256 algorithm
  - Access tokens for API authentication
  - Refresh tokens for long-lived sessions
  
- **Password Security**: 
  - SHA256-based hashing with passlib
  - Secure password storage in PostgreSQL
  
- **Admin Protection**: 
  - Admin-only endpoints require valid admin JWT token
  - Protected routes: categories (create/update/delete), products (create/update/delete), callbacks (list/delete)

### File Upload Security

- **UUID-Based Naming**: Uploaded images renamed with UUID to prevent filename conflicts
- **Type Validation**: File extensions validated based on content
- **Isolated Storage**: Product images stored in `static/products/` directory
- **Access Control**: Image retrieval available to all users, upload restricted to admins

### Database Security

- **Connection Security**: PostgreSQL connections via asyncpg with SSL support (configurable)
- **SQL Injection Prevention**: SQLAlchemy ORM with parameterized queries
- **Async Operations**: Non-blocking queries prevent timeout attacks

### CORS Configuration

- Configured via `FRONTEND_HOST` environment variable
- Restricts API access to authorized frontend domain
- Credentials allowed for authenticated requests

## Error Handling

The API uses HTTP status codes and descriptive error messages:

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission (admin required)
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error (check logs)

## Frontend Scripts

All npm scripts are available in the frontend directory:

```bash
npm run dev           # Start development server (http://localhost:3000)
npm run build         # Build for production
npm start             # Start production server
npm run lint          # Run ESLint for code quality checks
```

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running and accessible
psql -U postgres -h localhost -d mramor_db

# If using Docker
docker-compose logs db
```

### Port Already in Use

If port 8000 (backend) or 3000 (frontend) are already in use:

**Backend**:
```bash
poetry run fastapi dev --host localhost --port 8001
```

**Frontend**:
```bash
npm run dev -- -p 3001
```

### Image Upload Not Working

- Ensure `static/products/` directory exists
- Check file permissions: `chmod 755 static/products/`
- Verify admin authentication token is valid
- Check disk space availability

### Telegram Notifications Not Received

- Verify `TG_API_KEY` is correct
- Check `ADMIN_ID` is set to your chat ID (get it from @userinfobot)
- Ensure bot has permission to send messages
- Check application logs: `tail -f logs/app.log | grep -i telegram`

### Database Logs

```bash
# View Docker database logs
docker-compose logs db

# Connect directly to PostgreSQL
docker exec -it mramor-db psql -U postgres
```

## Contributing

When contributing to this project:

1. Follow the existing code structure and patterns
2. Maintain type safety (TypeScript on frontend, Pydantic on backend)
3. Write descriptive commit messages
4. Keep the README updated with any changes
5. Test both frontend and backend changes


## Performance Tips

### Frontend Optimization

- Next.js Image component for automatic image optimization
- Code splitting via dynamic imports
- Skeleton loading for better UX during data fetching
- Debounced search and filter operations

### Backend Optimization

- Async/await throughout for non-blocking I/O
- Database connection pooling via SQLAlchemy
- Query optimization with proper indexes
- Telegram notifications in background tasks

## Production Deployment

### Using Docker Compose

1. Update `.env` with production values
2. Change `SECRET_KEY` to a strong, random value
3. Set `FRONTEND_HOST` to your production domain
4. Run: `docker-compose -f docker-compose.yml up -d`

### Manual Deployment

**Backend**:
```bash
poetry install --no-dev
poetry run uvicorn src.main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Frontend**:
```bash
npm install
npm run build
npm start
```

## Related Documents

- [Docker Setup Guide](DOCKER.md) - Detailed Docker and Docker Compose instructions
- [API Documentation](http://localhost:8000/docs) - Interactive API docs (Swagger UI)

## Contact & Support

- **Telegram Backend**: [@ultimap](https://t.me/ultimap)
- **Telegram Frontend**: [@Konaisya](https://t.me/Konaisya)
- **Project Issues**: Create an issue in the repository

## License

This project is proprietary and confidential.
