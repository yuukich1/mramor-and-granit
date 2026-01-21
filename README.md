# Mramor and Granit Backend

A FastAPI-based REST API for managing products and categories with image upload functionality.

## Overview

This is a backend service built with FastAPI that provides endpoints for managing product categories and products. It features a clean architecture with separation of concerns through service, repository, and schema layers, using SQLAlchemy for async database operations with PostgreSQL.

## Features

- **Category Management**: Create, read, update, and delete product categories
- **Product Management**: Full CRUD operations for products with filtering and pagination
- **Image Upload & Storage**: Upload and retrieve product images with UUID-based file storage
- **User Authentication**: JWT-based registration and login with secure password hashing
- **Callback Requests**: Collect and manage callback requests with automatic Telegram notifications
- **Admin Dashboard Access**: Protected endpoints requiring admin authentication
- **Async Database Operations**: Built with SQLAlchemy and asyncpg for high-performance async database access
- **Structured Logging**: Comprehensive logging with file rotation and retention policies
- **Clean Architecture**: Organized code structure with clear separation of concerns

## Tech Stack

- **Framework**: FastAPI 0.128.0+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Async Driver**: asyncpg 0.31.0+
- **Python**: 3.14+
- **Configuration**: python-dotenv for environment management
- **Logging**: loguru for structured logging

## Project Structure

```
backend/
├── src/
│   ├── main.py                 # FastAPI application entry point
│   ├── config.py              # Configuration & logging setup
│   ├── dependencies.py        # FastAPI dependencies (UoW, Admin auth)
│   ├── models/                # SQLAlchemy ORM models
│   │   ├── base.py            # Base model with timestamps
│   │   ├── categories.py      # Category model
│   │   ├── products.py        # Product model
│   │   ├── users.py           # User model for authentication
│   │   ├── callback.py        # Callback request model
│   ├── repository/            # Data access layer
│   │   ├── categories.py      # Category repository
│   │   ├── products.py        # Product repository
│   │   ├── users.py           # User repository
│   │   ├── callback.py        # Callback repository
│   ├── routes/                # API endpoints
│   │   ├── categories.py      # Category endpoints
│   │   ├── products.py        # Product endpoints
│   │   ├── auth.py            # Authentication endpoints
│   │   ├── callback.py        # Callback endpoints
│   ├── schemas/               # Pydantic request/response models
│   │   ├── categories.py      # Category schemas
│   │   ├── products.py        # Product schemas
│   │   ├── users.py           # User schemas
│   │   ├── callback.py        # Callback schemas
│   ├── service/               # Business logic layer
│   │   ├── categories.py      # Category service
│   │   ├── products.py        # Product service
│   │   ├── auth.py            # Authentication service
│   │   ├── callback.py        # Callback service
│   ├── utils/                 # Utility functions
│   │   ├── connect.py         # Database connection
│   │   ├── repository.py      # Repository base classes
│   │   ├── unit_of_work.py    # Unit of work pattern
│   │   ├── tg_sender.py       # Telegram notifications
│   │   └── utils.py           # Helper functions
│   ├── static/                # Static files storage
│   │   └── products/          # Product images
│   └── logs/                  # Application logs
│       ├── app.log            # General logs (DEBUG+)
│       └── errors.log         # Error logs only
└── pyproject.toml             # Project dependencies and metadata
```

## Installation

### Prerequisites

- Python 3.14+
- PostgreSQL database
- Poetry (for dependency management)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd mramor-and-granit/backend
```

2. Install dependencies using Poetry:
```bash
poetry install
```

3. Create a `.env` file in the `backend` directory with your configuration:
```bash
DATABASE_URL=postgresql+asyncpg://user:password@localhost/dbname
```

## Running the Application

Start the development server:

```bash
poetry run fastapi dev
```

The API will be available at `http://localhost:8000`

Access the interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication (`/auth`)

- `POST /auth/register` - User registration
  - Request: `UserCreateSchema` (username, password, email, phone)
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

## Architecture

### Layers

1. **Routes** - HTTP endpoint handlers
2. **Schemas** - Pydantic models for request/response validation
3. **Service** - Business logic and orchestration
4. **Repository** - Database operations
5. **Models** - SQLAlchemy ORM models
6. **Utils** - Helper functions and database utilities

### Patterns

- **Unit of Work Pattern**: Manages database transactions and ensures data consistency
- **Dependency Injection**: FastAPI dependencies for database session management
- **Async Operations**: All I/O operations are non-blocking

## Configuration

Configuration is managed through environment variables using `python-dotenv`. Create a `.env` file in the `backend` directory:

```bash
# Database Configuration
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/mramor_db

# Security
SECRET_KEY=your_super_secret_key_here
ALGORITHM=HS256

# Telegram Bot (for callback notifications)
TG_API_KEY=your_telegram_bot_token
ADMIN_ID=your_telegram_admin_id
```

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string with asyncpg driver
- `SECRET_KEY` - Secret key for JWT token signing (change in production!)
- `ALGORITHM` - JWT algorithm (default: HS256)
- `TG_API_KEY` - Telegram bot API token for sending notifications
- `ADMIN_ID` - Telegram chat ID to receive callback notifications

## Logging

### Overview

The application uses **loguru** for structured, reliable logging. Logs are automatically captured at multiple levels with rotation and retention policies.

### Log Files

Logs are stored in the `logs/` directory:

- **`app.log`** - General application logs (all levels from DEBUG and above)
  - Rotation: 10 MB per file
  - Retention: 7 days
  
- **`errors.log`** - Error-level logs only
  - Rotation: 10 MB per file
  - Retention: 30 days

### Log Levels

The application uses the following log levels:

- `DEBUG` - Detailed information for debugging (router initialization, database operations)
- `INFO` - General informational messages (application startup/shutdown, successful operations)
- `WARNING` - Warning messages for potentially problematic situations
- `ERROR` - Error messages for failed operations
- `CRITICAL` - Critical system errors

### Console Output

- **Console (stdout)**: INFO level and above with color formatting for easy readability
- **File Output**: DEBUG level and above with full timestamp and context

### Example Log Entry

```
2026-01-21 14:30:45 | INFO     | main:startup_event:25 - Application startup - API is ready to accept requests
2026-01-21 14:31:02 | DEBUG    | routes.products:create:16 - POST /products - Creating product: "Marble Tiles"
2026-01-21 14:31:03 | INFO     | service.products:create:20 - Creating new product: ProductCreateSchemas(...)
2026-01-21 14:31:03 | SUCCESS  | service.products:create:23 - Product created with ID: 42
2026-01-21 14:31:05 | DEBUG    | routes.callback:create_callback:13 - POST /callback - New callback from John Doe
2026-01-21 14:31:05 | INFO     | service.callback:create_callback:18 - Creating new callback request for: John Doe
2026-01-21 14:31:06 | SUCCESS  | service.callback:create_callback:21 - Callback saved to DB with ID: 7
2026-01-21 14:31:06 | INFO     | service.callback:create_callback:23 - Telegram notification task added for callback ID: 7
2026-01-21 14:35:10 | ERROR    | service.products:update:95 - Failed to update: Product 999 not found
```

### Log Patterns by Component

**Routes (DEBUG)**: HTTP endpoint information - method, path, request params
```
DEBUG | routes.products:create:16 - POST /products - Creating product: "Product Name"
```

**Service (INFO/SUCCESS/ERROR)**: Business logic - operations, results, failures
```
INFO | service.categories:create:15 - Creating new category: CategoryCreateSchemas(...)
SUCCESS | service.categories:create:18 - Category created with ID: 5
ERROR | service.products:update:95 - Failed to update: Product 999 not found
```

**Application (INFO)**: Startup/shutdown events
```
INFO | main:startup_event:25 - Application startup - API is ready to accept requests
INFO | main:shutdown_event:30 - Application shutdown
```

### Accessing Logs

During development, you can monitor logs in real-time:

```bash
# Watch the main application log
tail -f logs/app.log

# Watch error logs
tail -f logs/errors.log

# Search for specific patterns
grep "ERROR" logs/app.log
grep "Product" logs/app.log
grep "CALLBACK" logs/app.log

# Watch specific service logs
grep "products" logs/app.log
grep "categories" logs/app.log
grep "auth" logs/app.log
```

## Security

### Authentication

- **JWT Tokens**: Uses JWT with HS256 algorithm for stateless authentication
- **Password Hashing**: SHA256-based password hashing with passlib
- **Admin Protection**: Sensitive endpoints require admin JWT token

### File Upload Security

- **UUID Naming**: Uploaded images are renamed with UUID to prevent filename conflicts
- **Extension Detection**: File types are validated based on extension
- **Isolated Storage**: Images stored in `static/products/` directory

## Error Handling

The API uses HTTP status codes and descriptive error messages:

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission (admin required)
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error (check logs)

## Contact

telegram: @ultimap
