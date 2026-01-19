# Mramor and Granit Backend

A FastAPI-based REST API for managing products and categories with image upload functionality.

## Overview

This is a backend service built with FastAPI that provides endpoints for managing product categories and products. It features a clean architecture with separation of concerns through service, repository, and schema layers, using SQLAlchemy for async database operations with PostgreSQL.

## Features

- **Category Management**: Create, read, update, and delete product categories
- **Product Management**: Full CRUD operations for products with filtering capabilities
- **Image Upload**: Upload and retrieve product images
- **Async Database Operations**: Built with SQLAlchemy and asyncpg for high-performance async database access
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
│   ├── config.py              # Configuration management
│   ├── dependencies.py        # FastAPI dependencies
│   ├── models/                # SQLAlchemy ORM models
│   │   ├── base.py
│   │   ├── categories.py
│   │   └── products.py
│   ├── repository/            # Data access layer
│   │   ├── categories.py
│   │   └── products.py
│   ├── routes/                # API endpoints
│   │   ├── categories.py
│   │   └── products.py
│   ├── schemas/               # Request/response schemas
│   │   ├── categories.py
│   │   └── products.py
│   ├── service/               # Business logic layer
│   │   ├── categories.py
│   │   └── products.py
│   ├── utils/                 # Utility functions
│   │   ├── connect.py         # Database connection
│   │   ├── repository.py      # Repository utilities
│   │   ├── unit_of_work.py    # Unit of work pattern
│   │   └── utils.py
│   ├── static/                # Static files storage
│   └── logs/                  # Application logs
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

### Categories

- `POST /categories/` - Create a new category
- `GET /categories/` - Get categories (filterable by name or id)
- `GET /categories/{category_id}` - Get a specific category
- `PUT /categories/{category_id}` - Update a category
- `DELETE /categories/{category_id}` - Delete a category

### Products

- `POST /products/` - Create a new product
- `GET /products/` - Get products (filterable by name, id, or price)
- `GET /products/{product_id}` - Get a specific product
- `PUT /products/{product_id}` - Update a product
- `DELETE /products/{product_id}` - Delete a product
- `PATCH /products/image/{id}` - Upload/update product image
- `GET /products/image/{image}` - Retrieve product image

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

Configuration is managed through environment variables using `python-dotenv`. Key variables:

- `DATABASE_URL` - PostgreSQL connection string with asyncpg driver

## Logging

Application logs are stored in the `logs/` directory using loguru for structured logging.

## Contact

telegram: @ultimap
